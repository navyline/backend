import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Clear the session cookie or any other session-related data
    const headers = new Headers();
    headers.append('Set-Cookie', 'session=; Max-Age=0; Path=/');

    return new NextResponse(JSON.stringify({ message: 'Logged out successfully' }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
