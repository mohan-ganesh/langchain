import dotenv from "dotenv";
import {
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} from "@google-cloud/vertexai";

dotenv.config();

const PROJECT = process.env.GOOGLE_PROJECT_ID;
const LOCATION = process.env.GOOGLE_LOCATION;

//Initialize the model
console.log("\nInitializing the model...");
console.log("Project:", PROJECT);
console.log("Location:", LOCATION);

// Create a Vertex AI client)

const vertex_ai = new VertexAI({ project: PROJECT, location: LOCATION });

const model = vertex_ai.getGenerativeModel({
  model: "gemini-1.0-pro",
  safety_settings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generation_config: { max_output_tokens: 256 },
});

console.log(model);

const requestGenerativeContentRequest = {
  contents: [{ role: "user", parts: [{ text: "How are you doing today?" }] }],
};

const response = model.generateContent(requestGenerativeContentRequest);

console.log("Generated content:", JSON.stringify(response));
