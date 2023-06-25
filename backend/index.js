import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
const port = 8000;

import mongoDb from "./mongoDB/connect.js";
import dalleroutes from "./routes/dalleroutes.js"
import postroutes from "./routes/postroutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postroutes);
app.use("/api/v1/dallE", dalleroutes);


app.get("/", (req, res) => {
    res.send("Hello from DALL-E")
})


try {
    mongoDb(process.env.MONGODB_URL);
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    })
}
catch (e) {
    console.log(e);
}
