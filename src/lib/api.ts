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


export async function getTemplateTests() {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API_URL}/template-test`, {
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

export async function getTemplateTest(id: string) {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API_URL}/template-test/${id}`, {
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

export async function sendTest(templateTestId: string, answers: { questionId: string, alternativeId: string }[], sum: number) {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API_URL}/test-performed/${templateTestId}/${sum}`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ answers })
    })

    const data = await response.json();
    if (!response.ok) return data.message

    return data

  } catch (error) {
    throw error
  }

}

export async function getTestsPerformed(userId: string) {
  const token = await getToken()

  try {
    const response = await fetch(`${API_URL}/test-performed/${userId}`, {
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

export async function getTestPerformedById(id: string) {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")

  try {
    const response = await fetch(`${API_URL}/test-performed/evaluate/${id}`, {
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

export async function getStudents() {
  const token = await getToken()
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")
  
  try {
    const response = await fetch(`${API_URL}/student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json();

    return data

  } catch (error) {
    throw error
  }
}

export async function getStudentById(id: string) {
  const token = await getToken();
  if (!token) throw new Error("Error de autenticación, inicie sesión nuevamente")
  
  try {
    const response = await fetch(`${API_URL}/student/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json();

    return data

  } catch (error) {
    throw error
  }
}
