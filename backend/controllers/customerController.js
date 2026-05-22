const customers = require("../data/customerList.json") 

exports.getAllCustomers = (req, res) => {
  try {
    // Create a copy and reverse (important: don't mutate original array)
    const latestFirst = [...customers].reverse();
    res.json(latestFirst);
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.editCustomers = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, country } = req.body;

    const customer = customers.find(c => c.id === id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (name) customer.name = name;
    if (email) customer.email = email;
    if (country) customer.country = country;

    res.json({
      status:200,
      message: "Customer updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

exports.addCustomers = (req, res) => {
  try {
    const { name, email, country } = req.body;

    // Validation
    if (!name || !email || !country) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Create new customer
    const newCustomer = {
      id: customers.length ? customers[customers.length - 1].id + 1 : 1,
      name,
      email,
      country
    };

    // Add to array
    customers.push(newCustomer);

    res.status(200).json({
      status: 200,
      message: "Customer added successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};


exports.deleteCustomers = (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const index = customers.findIndex(c => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customers.splice(index, 1);

    res.json({
      status:200,
      message: "Customer deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
};