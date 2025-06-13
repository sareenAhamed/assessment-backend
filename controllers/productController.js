import Product from "../models/Product.js";

// Add Product
export const addProduct = async(req, res) => {
    try {
        const productData = new Product(req.body);
        const {name, price, quantity} = productData;

        // Input Validation
        if (!name.trim() || name.length < 2) {
            return res.status(400).json({ error: 'Product name must be at least 2 characters.' });
        }

        if (price == null || isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number.' });
        }

        if (quantity == null || isNaN(quantity) || quantity < 0) {
            return res.status(400).json({ error: 'Quantity must be a positive number.' });
        }

        // Check and Add Product
        const productExist = await Product.findOne({name})
        if(productExist){
            return res.status(400).json({message: "Product already exist."})
        }

        const savedProduct = await productData.save();
        return res.status(200).json(savedProduct) 

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// Get All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if(products.length === 0){
            return res.status(404).json({message: "Products not found."})
        }
        return res.status(200).json(products)

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// Get Product by Id
export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findOne({_id: id});
        if(!productExist){
            return res.status(400).json({message: "Product not found."})
        }

        const product = await Product.findById(id)
        return res.status(200).json(product)

    } catch (error) {
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findOne({_id: id});
        if(!productExist){
            return res.status(400).json({message: "Product not found."})
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new:true})
        return res.status(201).json(updatedProduct)

    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const productExist = await Product.findOne({_id: id});
        if(!productExist){
            return res.status(400).json({message: "Product not found."})
        }

        await Product.findByIdAndDelete(id)
        return res.status(201).json({message: "Product deleted."})

    } catch (error) {
        return res.status(500).json({message:"Internal server error."})
    }
}