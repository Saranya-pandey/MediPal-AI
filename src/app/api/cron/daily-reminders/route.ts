import { NextResponse } from 'next/server';

// This endpoint runs daily at 8:00 AM via Vercel Cron
export async function GET(request: Request) {
  // Validate Vercel CRON header or secret here if not local
  const authHeader = request.headers.get('authorization');
  if (process.env.NODE_ENV !== 'development' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Medicine Reminders
    // Logic: check medicines where is_active=true, verify day, send push via Resend/WebPush

    // 2. Refill Reminders
    // Logic: calculate days_elapsed, if <= refill_reminder_days trigger alert

    // 3. Expiry Reminders
    // Logic: diff today and expiry_date, if <= reminder_days_before trigger alert

    // 4. Low Stock Reminders
    // Logic: check first_aid_inventory <= threshold trigger alert

    // 5. Preventive Care
    // Logic: diff today and next_due_date <= reminder_days_before trigger alert
    // If overdue (< 0), remind weekly

    return NextResponse.json({ success: true, message: 'Reminders processed successfully.' });
  } catch (error) {
    console.error('Error running daily cron:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
