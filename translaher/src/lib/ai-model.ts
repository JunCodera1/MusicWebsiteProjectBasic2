import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { LanguageModelV1 } from "ai";

type ModelType = "openai" | "anthropic" | "google";

export const getLanguageModel = (): LanguageModelV1 => {
  const openaiApiKey = import.meta.env.OPENAI_API_KEY;
  const anthropicApiKey = import.meta.env.ANTHROPIC_API_KEY;
  const googleApiKey = import.meta.env.GOOGLE_API_KEY;

  if (openaiApiKey) {
    console.log("OpenAI key found. Using OpenAI model");
    const openai = createOpenAI({
      apiKey: openaiApiKey,
    });

    return openai("gpt-4o");
  }

  if (anthropicApiKey) {
    console.log("Claude key found. Using Anthropic model");
    const anthropic = createAnthropic({
      apiKey: anthropicApiKey,
    });

    return anthropic("claude-3-5-sonnet-latest", {
      cacheControl: true,
    });
  }

  if (googleApiKey) {
    console.log("Gemini key found. Using Gemini AI model");
    const gemini = createGoogleGenerativeAI({
      apiKey: googleApiKey,
    });
    return gemini("gemini-1.5-pro-latest", {
      safetySettings: [
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE",
        },
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
      ],
    });
  }

  console.error("No API keys found");
  throw new Error("No API key found for any supported AI model");
};

export const getModelType = (): { type: ModelType; model: string } => {
  const model = getLanguageModel();

  const provider = model.provider.toLocaleLowerCase();

  if (provider.includes("openai"))
    return { type: "openai", model: model.modelId };
  if (provider.includes("anthropic"))
    return { type: "anthropic", model: model.modelId };
  if (provider.includes("google"))
    return { type: "google", model: model.modelId };

  throw new Error("Unknown model");
};
