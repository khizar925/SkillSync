import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { email, role } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  if (!['recruiter', 'candidate'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: email.trim().toLowerCase(), role });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }

  const { count } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({ success: true, count: (count ?? 0) + 500 });
}
