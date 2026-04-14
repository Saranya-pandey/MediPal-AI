import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { profile, existingSchedule, recentOcrText, vitalsSummary } = await request.json();

    const claudePrompt = `Based on the following family member profile and uploaded health documents, recommend any preventive health checkups that are not already in their schedule.

Family member: ${profile.name}, age ${profile.age}, gender ${profile.gender}
Existing schedule: ${existingSchedule}
Recent documents: ${recentOcrText}
Recent vitals: ${vitalsSummary}

Return ONLY a JSON array of recommended care items.
Each item must have:
- care_type (from allowed list)
- care_name (short descriptive name)
- frequency_months (how often in months)
- reason (one sentence explaining why recommended)

Only recommend care clinically appropriate for this person's age and gender. Do not recommend more than 5 items at once. Do not recommend items already in their existing schedule.`;

    /*
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 500,
      system: "You are an AI Preventive Care engine.",
      messages: [{ role: 'user', content: claudePrompt }]
    });

    const recommendations = JSON.parse(response.content[0].text);
    */
    
    // Mock Response
    const recommendations = [
      {
        care_type: "vitamin_d_test",
        care_name: "Vitamin D Test",
        frequency_months: 12,
        reason: "Recommended based on age and lack of outdoor sunlight tracking."
      }
    ];

    return NextResponse.json({ success: true, recommendations });
  } catch (error) {
    console.error("Care suggestion error", error);
    return NextResponse.json({ error: "Failed to generate AI suggestions" }, { status: 500 });
  }
}
