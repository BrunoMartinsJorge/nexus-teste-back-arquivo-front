"use client";

import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axiosHttp from "~/shared/utils/interceptor";

export default function Registro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [visivel, setVisivel] = useState({
    senha: false,
    confirmarSenha: false,
  });

  function formularioValido(): boolean {
    return (
      form.email !== "" &&
      form.senha !== "" &&
      form.confirmarSenha !== "" &&
      form.senha === form.confirmarSenha
    );
  }

  async function registrarUsuario(): Promise<void> {
    try {
      const response = await axiosHttp.post("/auth/registro", form);
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
        <h1 className="text-2xl font-bold">Novo Aqui?</h1>
        <p className="font-light">
          Sejá Bem-Vindo! Registre-se para ter sua carteira de crypto.
        </p>
      </div>
      <form action="">
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="nome">Nome</label>
          <input
            required
            type="text"
            name="nome"
            id="nome"
            className="border-2 border-gray-400 p-2 rounded"
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            required
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
              required
              type={visivel.senha ? "text" : "password"}
              name="senha"
              id="senha"
              className="border-2 border-gray-400 p-2 rounded flex-2"
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />
            <button
              type="button"
              className="border-2 border-gray-400 p-2 rounded cursor-pointer"
              onClick={() =>
                setVisivel({ ...visivel, confirmarSenha: !visivel.senha })
              }
            >
              {visivel.senha ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="confirmarSenha">Repita a Senha</label>
          <div className="flex gap-2">
            <input
              required
              type={visivel.confirmarSenha ? "text" : "password"}
              name="confirmarSenha"
              id="confirmarSenha"
              className="border-2 border-gray-400 p-2 rounded flex-2"
              onChange={(e) =>
                setForm({ ...form, confirmarSenha: e.target.value })
              }
            />
            <button
              type="button"
              className="border-2 border-gray-400 p-2 rounded cursor-pointer"
              onClick={() =>
                setVisivel({
                  ...visivel,
                  confirmarSenha: !visivel.confirmarSenha,
                })
              }
            >
              {visivel.confirmarSenha ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formularioValido()}
          onClick={registrarUsuario}
        >
          Registrar
        </button>
      </form>
    </>
  );
}
