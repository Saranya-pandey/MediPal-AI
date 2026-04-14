import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query, familyMember, context } = await request.json();
    
    // Step 1: Generate Embedding of User Query
    // const queryVector = await openai.embeddings.create(query);
    
    // Step 2: pgvector search medical docs AND knowledge base
    // const docContext = supabase.rpc('match_documents', { query_embedding: queryVector, filter: familyMember.id, limit: 3 });
    // const kbContext = supabase.rpc('match_knowledge', { query_embedding: queryVector, limit: 2 });
    
    const systemPrompt = `You are MediPal AI, a warm and trustworthy family health assistant.
Your job is to help users find information from their uploaded medical documents, their preventive care schedule, and the MediPal AI health knowledge base.

You must follow these rules strictly and without exception:
1. Only answer using the document excerpts, preventive care records, and knowledge base articles provided to you in this prompt. Do not use any other knowledge.
2. Do not diagnose any medical condition.
3. Do not recommend any treatment, medication, dosage change, or lifestyle prescription.
4. Do not suggest stopping or changing any prescribed medicine.
5. If the answer is not in the context provided, say exactly: "I couldn't find this in your uploaded records or our health library. Please consult your doctor for this question."
6. When referencing a document, always state the document name and date clearly.
7. When referencing a knowledge base article, mention the article title.
8. When referencing preventive care, mention the care item name, last done date, and next due date.
9. Always end every response with this exact line: "This is not medical advice. Please consult your doctor for any medical decisions."
10. Be warm, clear, and easy to understand. No medical jargon.

Context provided:
[SELECTED FAMILY MEMBER]: ${familyMember.name}
[DOCUMENT EXCERPTS]: ${context.documents}
[KNOWLEDGE BASE]: ${context.knowledge}
[PREVENTIVE CARE SCHEDULE]: ${context.schedule}`;

    /*
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 800,
      system: systemPrompt,
      messages: [{ role: 'user', content: query }]
    });

    return NextResponse.json({ success: true, text: response.content[0].text });
    */

    return NextResponse.json({ success: true, text: "Mock response containing the results + standard disclaimers." });

  } catch (err) {
    console.error("Chat API error", err);
    return NextResponse.json({ error: "Failed to fetch chat response" }, { status: 500 });
  }
}
