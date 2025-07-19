// lib/getSession.ts
// NOTE: Never trust client-side session data for authorization. Always validate on the server.
import { cookies } from 'next/headers'

export function getUserSession() {
  const session = cookies().get('user-session')?.value
  if (!session) return null
  try {
    return JSON.parse(session) // { userId, userType }
  } catch {
    return null
  }
}
