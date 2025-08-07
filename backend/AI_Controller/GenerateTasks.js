import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const GenerateTasksByAi = async (name, description, numTasks) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: { temperature: 0.7 } });

    const prompt = `Project Title: ${name}\nProject Description: ${description}\nYou are an AI project manager assistant. Based on the provided project title and description, generate a list of exactly 10 distinct project tasks, output as a JSON array of objects. Ensure the output is valid JSON.\n\nEach task object must contain the following fields:\n\n{\n  "title": "",          // A clear and concise task name starting with an action verb (e.g., Design, Build, Write, Test, etc.)\n  "description": "",    // A 1–3 sentence explanation of what the task involves\n  "priority": ""        // One of: "low", "medium", "high", or "very-high" based on the task's importance to the overall project\n}\n🔹 Requirements:\nTasks should be specific, actionable, and assignable to individual team members.\nTasks must follow a logical chronological order (e.g., from planning to execution to testing/deployment).\nThe priorities should be estimated based on how critical or time-sensitive each task is within the project.\nThe entire output should be a JSON-style array of 10 objects, and nothing else — no explanation, no titles, just clean JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    console.log("AI Task Generation Response:", text);

    try {
      // Attempt to extract JSON from the text
      const jsonStartIndex = text.indexOf('[');
      const jsonEndIndex = text.lastIndexOf(']');
      if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonStartIndex < jsonEndIndex) {
        text = text.substring(jsonStartIndex, jsonEndIndex + 1);
      }
      const tasks = JSON.parse(text);
        return tasks;
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      console.error("Raw response from Gemini:", text);
      return [];
    }
  } catch (error) {
    console.error("Error generating tasks:", error);
    return [];
  }
};