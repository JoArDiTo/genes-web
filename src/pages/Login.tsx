import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../lib/api";
import { toast } from "sonner";

export const LoginPage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error('La página debe utilizarse dentro de un AuthProvider');

  const { auth } = authContext;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;

    const email = elements.namedItem("email") as HTMLInputElement;
    const password = elements.namedItem("password") as HTMLInputElement;
    
    if (!email || !password) return;

    console.log({ email: email.value, password: password.value });

    const data = await login(email.value, password.value)

    if (!data.token) return toast.error(data);

    auth(data.token)

  }

  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen py-5 px-3 bg-[url('/images/login-found.webp')] bg-cover bg-center">
        <form className="bg-white/80 w-full max-w-md flex flex-col gap-4 border-2 border-gray-300 rounded-md py-20 px-4" onSubmit={handleSubmit}>
          <img className="w-2/3 object-contain mx-auto pb-8" src="https://colegiogenes.edu.pe/wp-content/uploads/2020/10/logo.svg" alt="Logo de la institución educativa GENES" />
            <input 
              id="email"
              type="email"
              placeholder="Correo electrónico"
              className="block border z-0 border-gray-300 rounded-lg p-2"
              required
            />
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 rounded-lg p-2"
            required
          />
          <button className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md" type="submit">
            Iniciar sesión
          </button>
        </form>
      </section>
    </>
  )
}