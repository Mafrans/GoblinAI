import OpenAI from "openai";
import { loadConfig } from "./config";

export async function createOpenAIClient() {
  const config = await loadConfig();
  return new OpenAI({
    apiKey: config.openai_api_key,
    baseURL: config.openai_base_url,
  });
}
