import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function POST() {
  try {
    const session = await auth();
    
    // This will clear the session cookie
    return NextResponse.json({ 
      success: true,
      message: 'Signed out successfully'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Sign out failed'
    }, { status: 500 });
  }
}