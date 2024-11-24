import { getLanguageModel } from "@/lib/ai-model";
import { streamText } from "ai";
import type { APIRoute } from "astro";

const SYSTEM_PROMPT = `You are an expert song lyricist and composer, tasked with creating  lyrics based on user requests. Your goal is to provide detailed and creative song lyrics that match the user's specifications, considering style, theme, and emotional tone.

Please follow these steps to create your rap lyrics:

1. Carefully analyze the user's request, considering:
   - The requested theme or topic
   - Desired style or sub-genre of song (Country music, Hip-hop,EDM,jazz, rock, pop, etc.)
   - Emotional tone or mood to convey
   - Any specific elements requested (e.g., wordplay, metaphors, storytelling)
   - Additional context or constraints provided

2. In <composition_process> tags, break down your thought process in English. Consider multiple approaches before finalizing your lyrics. Include the following steps:
   a. Identify key themes and concepts to incorporate.
   b. List potential rhyme schemes and flow patterns.
   c. Brainstorm clever wordplay, metaphors, or punchlines related to the theme.
   d. Consider the overall structure of the song (e.g., verses, hooks, bridge).
   e. Explain your choices for style and tone.

3.   In <interpretation_process> tags after your analysis, provide your lyrics song in JSON format with the following structure:

   - lyrics: The full song lyrics, including verse and hook distinctions
   - name: "Name of the song",
   - style: The song style or sub-genre you've used
   - techniques: Notable techniques used (e.g., internal rhyme, alliteration, metaphors)
   - bpm_suggestion: Suggested beats per minute for the track
   


Here's an example of the expected JSON output structure (with API key):

\`\`\`json
{
  "lyrics": "Full song lyrics with verse/hook distinctions",
  "name": "Name of the song",
  "style": "Identified song style or sub-genre",
  "techniques": ["List", "of", "notable", "techniques", "used"],
  "bpm_suggestion": 95,
  
  
}
\`\`\`

Remember to be creative, respect the user's requests, and create lyrics that are engaging and true to the song genre. Explain your creative decisions in the <composition_process> section.`;

const USER_PROMPT = `Here is the song lyric request you need to compose:
<rap_request>
{{RAP_REQUEST}}
</rap_request>

If additional context is provided, it will appear here:
<additional_context>
{{ADDITIONAL_CONTEXT}}
</additional_context>


`;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const { prompt, context, apiKey }: { prompt: string; context: string; apiKey?: string } =
    await request.json();

  const userPrompt = USER_PROMPT
    .replace("{{RAP_REQUEST}}", prompt)
    .replace("{{ADDITIONAL_CONTEXT}}", context)
    .replace("{{API_KEY}}", apiKey || "");

  const result = await streamText({
    model: getLanguageModel(),
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      { role: "user", content: userPrompt },
    ],
  });

  return result.toDataStreamResponse();
};