import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import clientRoute from "./routes/clientRoute.js";
import accountRoute from "./routes/accountRoute.js";

mongoose
    .connect("mongodb://localhost:27017/bank")
    .then(() => console.log("✅ connected to database"))
    .catch((err) => console.log("❌failed to connect to database: ", err));

const app = express();

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    console.log(req.method, req.path, new Date().toLocaleString());
    next();
});

app.use("/api/clients", clientRoute);
app.use("/api/accounts", accountRoute);

app.use((req, res) => res.status(404).json({ message: "invalid path or method" }));

app.listen(3001, ()=>console.log('✅ server is running on http://localhost:3001'))