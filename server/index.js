import express from "express";
import dotenv from "dotenv"
import schema from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import colors from "colors"
import cors from "cors"
import connectDB from "./config/db.js";

dotenv.config()
const { PORT, NODE_ENV } = process.env

const port = PORT || 5000
const app = express();
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: NODE_ENV === "development",

}))

// connect to DB
connectDB()

app.listen(port, console.log(`Server running on port ${port}`));