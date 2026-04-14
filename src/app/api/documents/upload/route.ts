import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
// Assume supabase and openai are exported from src/lib
// import { supabase } from '@/lib/supabase';
// import { openai } from '@/lib/openai';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const docType = formData.get('document_type'); // 'prescription', 'medicine_box', 'report'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Process via OCR Based on Type 
    let systemPrompt = '';
    
    if (docType === 'prescription') {
      systemPrompt = `You are a medical document reader. Extract the following from this prescription image and return ONLY a JSON object. No explanation, no markdown, no preamble.
      Return format: {"medicines": [{"name": "string", "dose": "string", "frequency": "string", "duration_days": number/null, "time_of_day": ["morning","afternoon","night"]}]}`;
    } else if (docType === 'medicine_box') {
      systemPrompt = `You are a medicine packaging reader. Extract the following from this image and return ONLY a JSON object. No explanation, no markdown, no preamble.
      Return format: {"expiry_date": "MM/YYYY or DD/MM/YYYY", "tablet_count": number/null}`;
    } else {
      systemPrompt = `You are a medical document reader. Extract all text from this document accurately. Preserve all numbers, units, and results exactly as printed. Return the complete extracted text only.`;
    }

    // Convert file to base64 for Claude Vision API (mocking extraction step)
    // const base64Image = await fileToBase64(file as File);
    
    /* 
    const claudeResult = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [ { role: 'user', content: [ { type: 'image', source: { type: 'base64', media_type: file.type, data: base64Image } } ] } ]
    });
    const ocrExtractedText = claudeResult.content[0].text;
    */

    const ocrExtractedText = 'Mock extracted text...';

    // 2. Generate embedding of extracted text (for standard reports)
    // const embedding = await openai.embeddings.create({ input: ocrExtractedText, model: "text-embedding-3-small" });

    // 3. Save to Supabase medical_documents + RAG vectors
    // await supabase.from('medical_documents').insert({...})

    // Return the response data
    return NextResponse.json({ success: true, text: ocrExtractedText });

  } catch (err) {
    console.error('Upload error', err);
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
  }
}
