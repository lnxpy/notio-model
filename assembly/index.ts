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
      `summarize the input markdown and return only the ${language} summarized text in the form of markdown`,
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
      `conclude the input markdown and return only the ${language} version of the summarized text in the form of markdown`,
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}
