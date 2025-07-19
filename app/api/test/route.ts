import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const result = schema.safeParse(body)
  if (!result.success) {
    return new NextResponse(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://yourtrusteddomain.com',
        'Content-Security-Policy': "default-src 'self'",
        'X-Frame-Options': 'DENY',
      },
    })
  }
  // Sanitize output (never echo raw input)
  const { name, email } = result.data
  return new NextResponse(JSON.stringify({ message: `Hello, ${name}!`, email }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://yourtrusteddomain.com',
      'Content-Security-Policy': "default-src 'self'",
      'X-Frame-Options': 'DENY',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': 'https://yourtrusteddomain.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
