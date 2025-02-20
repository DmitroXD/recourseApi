import express from "express"
import bodyParser from "body-parser"
import apiRouter from "./router";


export async function createApp() {
    const app = express()
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        next();
    })
    app.use(bodyParser.json())
    app.use("/api", apiRouter);

    return app;
}
