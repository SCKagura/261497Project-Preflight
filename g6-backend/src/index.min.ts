import "dotenv/config";
import express from "express";
import { dbClient } from "@db/client";

//Intializing the express app
const app = express();

// Extracts the entire body portion of an incoming request stream and exposes it on req.body.
app.use(express.json());

// Query
app.get("/todo", async (req, res, next) => {
  try {
    const results = await dbClient.query.todoTable.findMany();
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// Running app
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
});
