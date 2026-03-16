"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TbLogout } from "react-icons/tb";
import axiosHttp from "~/shared/utils/interceptor";

export default function Header({
  recarregarSaldo,
}: {
  recarregarSaldo: boolean;
}) {
  useEffect(() => {
    identificarUsuario();
  }, [recarregarSaldo]);

  const [user, setUser] = useState({
    nome: "",
    saldo: 0.0,
  });

  function identificarUsuario(): void {
    const token = localStorage.getItem("access_token");
    if (!token || token === undefined) {
      window.location.href = "/login";
      return;
    }
    const payload: any = jwtDecode(token);
    const dataExpiracao = payload.exp * 1000;
    if (dataExpiracao < Date.now()) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken || refreshToken === undefined) {
        window.location.href = "/login";
        return;
      } else {
        const payloadRefresh: any = jwtDecode(refreshToken);
        const dataExpiracaoRefresh = payloadRefresh.exp * 1000;
        if (dataExpiracaoRefresh < Date.now()) {
          window.location.href = "/login";
          return;
        }
      }
    }
    setUser((prev) => ({
      ...prev,
      nome: payload.nome,
    }));
    buscarSaldo();
  }

  async function buscarSaldo(): Promise<void> {
    try {
      const response = await axiosHttp.get("/wallet/saldo");
      if (response.status === 200) {
        setUser((prev) => ({
          ...prev,
          saldo: response.data.saldo,
        }));
      } else {
        console.error(response.data);
        return Promise.reject(response);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  }

  return (
    <>
      <header className="flex bg-blue-500 items-center justify-between p-4">
        <div>
          <h1 className="text-white font-bold text-2xl">Olá, {user.nome}</h1>
          <p>Seu saldo atual é de R$ {user.saldo}</p>
        </div>
        <span
          onClick={logout}
          className="text-white cursor-pointer text-2xl hover:bg-blue-600 p-2 rounded transition ease-in duration-200"
        >
          <TbLogout></TbLogout>
        </span>
      </header>
    </>
  );
}
