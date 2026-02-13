
import { GoogleGenAI, Type } from "@google/genai";
import { PatientData, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateMarketingInsight(patient: PatientData, result: AnalysisResult): Promise<string> {
  const prompt = `
    As an AI Marketing Expert focusing on Healthcare (Hemoscan), provide a short, high-impact marketing message 
    and strategic positioning for the following patient case:
    
    Patient Data:
    - Hemoglobin: ${patient.hemoglobin} g/dL
    - RBC Count: ${patient.rbcCount} million/μL
    - Risk Category: ${result.category}
    - Risk Score: ${result.riskScore}/100
    
    The goal is to use an "AI Marketing Mindset" (Predictive, Personalized, Trust-based, Social Impact).
    Give me a single paragraph that sounds professional and persuasive for a clinical stakeholder.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Unable to generate insight at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Precision AI analysis complete. Target early intervention protocols.";
  }
}

export async function generateStrategySummary(): Promise<string> {
  const prompt = `
    Explain the relationship between an AI Marketing Mindset and the Hemoscan Anemia Detection system.
    Focus on how AI helps in predictive healthcare marketing. Use an academic yet accessible tone.
    Provide the response in Markdown format with bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.5,
      }
    });

    return response.text || "Strategic summary unavailable.";
  } catch (error) {
    return "Error generating summary.";
  }
}
