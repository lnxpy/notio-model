import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";

const TEMPERATURE = 0.2;

export function summarizeArticle(content: string, language: string): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      `I have a markdown document that contains a mix of text, lists, and code blocks. I want you to summarize the textual content into ${language}, while retaining the original markdown formatting. Do not translate or modify any content inside inline code blocks (content) or fenced code blocks (content), but keep them intact and in their original position.
      For example:
      If the markdown contains headers, lists, or blockquotes, ensure they are summarized and translated while preserving their markdown syntax.
      Leave all code blocks exactly as they are without summarizing or translating their content.`,
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function concludeArticle(content: string, language: string): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      `conclude the input markdown and return only the summarized text in the form of markdown in ${language}, but the code blocks and snippets.`,
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}
