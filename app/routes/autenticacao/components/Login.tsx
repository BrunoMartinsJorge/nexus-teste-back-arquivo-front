"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosHttp from "~/shared/utils/interceptor";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [visivel, setVisivel] = useState(false);

  function formularioValido(): boolean {
    return form.email !== "" && form.senha !== "";
  }

  async function logarUsuario(): Promise<void> {
    try {
      const response = await axiosHttp.post("/auth/login", form);
      if (response.status === 201) {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        window.location.href = "/";
      } else {
        console.error(response.data);
        return Promise.reject(response);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="text-left flex flex-col gap-2 mb-4">
        <h1 className="text-2xl font-bold">Já é de casa?</h1>
        <p className="font-light">
          Sejá Bem-Vindo! Entre para ter sua carteira de crypto.
        </p>
      </div>
      <form>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border-2 border-gray-400 p-2 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="senha">Senha</label>
          <div className="flex gap-2">
            <input
              type={visivel ? "text" : "password"}
              name="senha"
              id="senha"
              className="border-2 border-gray-400 p-2 rounded flex-2"
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
            <button
              type="button"
              className="border-2 border-gray-400 p-2 rounded cursor-pointer"
              onClick={() => setVisivel(!visivel)}
            >
              {visivel ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formularioValido()}
          onClick={logarUsuario}
        >
          Entrar
        </button>
      </form>
    </>
  );
}
