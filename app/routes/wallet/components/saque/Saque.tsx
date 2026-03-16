"use client";

import { useState } from "react";
import axiosHttp from "~/shared/utils/interceptor";

interface SaqueProps {
  onChange: () => void;
}

export default function Saque({ onChange }: SaqueProps) {
  const [saque, setSaque] = useState({
    amount: 0,
    token: "BRL",
  });

  function validarSaque(): boolean {
    return saque.amount > 0 && saque.token !== "";
  }

  function efetuarSaque(): void {
    if (!validarSaque()) return;
    axiosHttp.post("/saque", saque).then((response) => {
      let mensagem = "";
      if (response.status === 201) {
        mensagem = "Saque efetuado com sucesso";
        onChange();
      } else {
        mensagem = "Ocorreu um erro ao efetuar o saque";
      }
      alert(mensagem);
    });
  }

  return (
    <>
      <main className="border-white-500 border-2 rounded w-auto h-auto p-10 gap-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Saque</h2>
          <p>Saque de criptomoedas</p>
        </div>
        <form className="flex gap-4 items-end">
          <div className="flex gap-4 flex-1">
            <div className="flex gap-4 flex-col flex-2">
              <label htmlFor="quantidade_saque">Quantidade</label>
              <input
                type="number"
                name="quantidade_saque"
                step={0.1}
                value={saque.amount}
                onChange={(e) => {
                  setSaque({ ...saque, amount: Number(e.target.value) });
                }}
                id="quantidade_saque"
                className="border-2 border-gray-400 p-2 rounded flex-1"
              />
            </div>
            <div className="flex gap-4 flex-col flex-1">
              <label htmlFor="tipo_saque">Sacar de...</label>
              <select
                name="tipo_saque"
                id="tipo_saque"
                className="border-2 border-gray-400 p-2 rounded flex-1"
                value={saque.token}
                onChange={(e) => {
                  setSaque({ ...saque, token: e.target.value });
                }}
              >
                <option
                  value="BRL"
                  className="border-2 border-gray-400 p-2 rounded flex-1 bg-white dark:bg-gray-900"
                >
                  BRL
                </option>
                <option
                  value="BTC"
                  className="border-2 border-gray-400 p-2 rounded flex-1 bg-white dark:bg-gray-900"
                >
                  BTC
                </option>
                <option
                  value="ETH"
                  className="border-2 border-gray-400 p-2 rounded flex-1 bg-white dark:bg-gray-900"
                >
                  ETH
                </option>
              </select>
            </div>
          </div>
        </form>
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!validarSaque()}
          onClick={efetuarSaque}
        >
          Sacar
        </button>
      </main>
    </>
  );
}
