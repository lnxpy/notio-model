import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";

const TEMPERATURE = 0.2;

export function abstractArticle(content: string): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      "Generate an abstraction from the input markdown and return nothing but only the abstraction in the form of markdown.",
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function simplifyArticle(content: string): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      "Simplify the input markdown and return nothing but only the simplified markdown in the form of markdown.",
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function translateArticle(content: string, language: string): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      `Translate the input markdown to ${language} and return nothing but only the translated markdown in the form of markdown.`,
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function generateQuestions(
  content: string,
  limit: string,
  include_answers: bool,
): string {
  const model = models.getModel<OpenAIChatModel>("base-model");
  const input = model.createInput([
    new SystemMessage(
      `Generate ${limit} questions ${include_answers ? "with answers" : ""} from the input markdown and return nothing but only the questions ${include_answers ? "and answers" : ""} in the form of markdown.`,
    ),
    new UserMessage(content),
  ]);

  input.temperature = TEMPERATURE;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}
