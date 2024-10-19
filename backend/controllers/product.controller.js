import Product from "../model/product.model.js";

// Get Product
export const getProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create Product 

export const createProducts = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Product

export const updateProducts = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(404).json({ success: false, message: "Product not found" });
  }
};

// Delete Products 
export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log("error in deleting product: ", error.message);
    res.status(404).json({ success: false, message: "Product not found" });
  }
};
