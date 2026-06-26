const Product = require("../model/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    console.log(products, "check mydata");

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error("getAllProducts error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product added successfully",
      data: product,
    });
  } catch (err) {
    console.error("addProduct error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("editProduct error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (err) {
    console.error("deleteProduct error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};




exports.getLinkedinPosts = async (req, res) => {
  try {
    const posts = [
      {
        id: 1,
        heading: "React Hooks",
        description:
          "Hooks allow functional components to manage state and lifecycle methods.",
      },
      {
        id: 2,
        heading: "Next.js App Router",
        description:
          "App Router provides layouts, server components, and improved routing.",
      },
      {
        id: 3,
        heading: "TypeScript Benefits",
        description:
          "TypeScript helps catch errors during development and improves code quality.",
      },
    ];

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getPostReactions = async (req, res) => {
  try {
    const reactions = [
      {
        postId: 1,
        likes: 120,
        dislikes: 5,
      },
      {
        postId: 2,
        likes: 95,
        dislikes: 2,
      },
      {
        postId: 3,
        likes: 230,
        dislikes: 8,
      },
    ];

    res.status(200).json({
      message: "Reactions fetched successfully",
      data: reactions,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getPostDetails = async (req, res) => {
  try {
    const details = [
      {
        postId: 1,
        tags: ["React", "Hooks", "Frontend"],
        comments: [
          {
            id: 1,
            user: "Rahul",
            text: "Very informative post.",
          },
          {
            id: 2,
            user: "Amit",
            text: "Thanks for sharing.",
          },
        ],
      },
      {
        postId: 2,
        tags: ["Next.js", "SSR"],
        comments: [
          {
            id: 3,
            user: "Priya",
            text: "App Router is awesome.",
          },
        ],
      },
      {
        postId: 3,
        tags: ["TypeScript", "JavaScript"],
        comments: [
          {
            id: 4,
            user: "Neha",
            text: "Type safety saves a lot of time.",
          },
        ],
      },
    ];

    res.status(200).json({
      message: "Tags and comments fetched successfully",
      data: details,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};