import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAqhzJzteLhnnha2Owezcxto6gzp9PyRfQ");

export function extractSentences(text: string) {
  // Cümleleri ayıklamak için bir dizi oluşturalım
  let sentences = [];

  // Metni noktalama işaretlerine göre cümlelere böl
  let rawSentences = text.split(/([.!?])/);

  // Boşlukları temizle ve boş cümleleri filtrele
  sentences = rawSentences
    .map((sentence, index, array) => {
      // Her iki öğeyi birleştir: cümle ve noktalama işareti
      if (index % 2 === 0) {
        return sentence + (array[index + 1] || "");
      }
      return null;
    })
    .filter((sentence) => sentence !== null)
    .map((sentence) => sentence.trim());

  return sentences;
}

export async function generateText(content: string) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Can you write one beginner, intermediate, advanced and one question English sentence containing the word ${content} without using * and paying attention to punctuation?`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(extractSentences(response.text()));
  return response.text();
}

export async function generateTextByLevelOrType(
  content: string,
  textLevelOrType: string
) {
  console.log({ content });
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Can you write one ${textLevelOrType} English sentence containing the word ${content} without using *, using "${textLevelOrType}:" before starting the sentence, and paying attention to punctuation?`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());
  return response.text();
}
