import dotenv from "dotenv";

import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const client = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function getEmbeddings(text) {
  console.log("start of embeddings");
  const model = client.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  const embedding = result.embedding;
  console.log(embedding.values);
  console.log("end of embeddings");
}

getEmbeddings();
