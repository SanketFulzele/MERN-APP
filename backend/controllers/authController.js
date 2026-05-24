const jwt = require("jsonwebtoken");
const Owner = require("../model/Owner");


exports.register = async (req, res) => {
  try{
    const user = await Owner.create(req.body);
    res.status(200).json({
        message: "Owner Created Successfully",
        data : user
    })
  }catch(err){
    console.error('error:', err);
    res.status(500).json({
      error: err.message
    })
  }
}



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Owner.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "mysecretkey",
      { expiresIn: "1hr" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      data: user
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};