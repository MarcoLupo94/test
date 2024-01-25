import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./src/data-source";
import reviewsRoutes from "./src/routes/reviews";
import customersRoutes from "./src/routes/customers";
import productsRoutes from "./src/routes/products";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", reviewsRoutes);
app.use("/", customersRoutes);
app.use("/", productsRoutes);

// Start the Express server
app.listen(port, async () => {
    console.log(`Server is running at http://localhost:${port}`);
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Initialized successfully");
    })
    .catch((error) => console.log(error));