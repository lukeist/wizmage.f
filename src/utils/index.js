import FileSaver from "file-saver";
import {
  surpriseMePromptsEN,
  surpriseMePromptsVI,
  surpriseMePromptsDE,
} from "../constants";

export function getRandomPrompt(prompt) {
  const browserLanguage = navigator.language;
  const surpriseMePrompts = browserLanguage.startsWith("vi")
    ? surpriseMePromptsVI
    : browserLanguage.startsWith("de")
    ? surpriseMePromptsDE
    : surpriseMePromptsEN;

  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  const randomPrompt = surpriseMePrompts[randomIndex];
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
