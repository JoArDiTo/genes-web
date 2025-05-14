import { API_URL } from "./envs";
import { getToken } from "./services";

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) return data.message

    return data

  } catch (error) {
    throw error
  }
}

export async function getProfile() {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) return data.message

    return data

  } catch (error) {
    throw error
  }
}