import express from "express"
import { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/productController.js";

const route = express.Router();

route.post("/addProduct", addProduct);
route.get("/getAllProducts", getAllProducts);
route.get("/getProductById/:id", getProductById)
route.put("/updateProduct/:id", updateProduct);
route.delete("/deleteProduct/:id", deleteProduct)

export default route;