import { cookieStore } from 'cookie-store';

export async function setToken(token: string) {
  await cookieStore.set({
    name: 'token',
    value: token,
    domain: 'localhost',
    path: '/',
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  })
}

export async function getToken() {
  const token = await cookieStore.get('token')
  return token?.value ?? null
}

export async function removeToken() {
  await cookieStore.delete('token')
}