import express from "express";
import { Product } from "../entities/Product";
import { AppDataSource } from "../data-source";

const router = express.Router();

// Route to get all products
router.get("/products", async (req, res) => {
    try {
        const products = await AppDataSource.manager.find(Product);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//purchase product
router.post("/purchaseProduct/:productId", async (req, res) => {
    try {
        const product = await AppDataSource.manager.findOne(Product, { where: { id: parseInt(req.params.productId) } });

        if(product.stock <= 0) return res.status(404).json({ error: "Product out of stock" });

         if (product) {
            product.stock = product.stock - 1;
            await AppDataSource.manager.save(product);
            res.json(product);
        } else {
            res.status(404).json({ error: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
