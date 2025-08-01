import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).send("Something went wrong while fetching product!");
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    res.status(404).json({
      status: false,
      message: "Please provide all the details!",
    });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product Save Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(
      `Something went wrong while saving Product details:${error.message}`
    );
    res.status(500).send("Service not available at this moment");
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).send("Product not found!");
  }
  try {
    await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    res.status(201).json({
      success: true,
      message: "Product Updated Success!",
    });
  } catch (error) {
    res.status(500).send("Something went wrong while updating product!");
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(404).send("Product not found!");
  }
  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: "Product removed successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting product",
    });
  }
};
