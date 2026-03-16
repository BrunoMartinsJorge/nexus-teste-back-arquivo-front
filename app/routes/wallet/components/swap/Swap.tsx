"use client";
import { useState } from "react";
import axiosHttp from "~/shared/utils/interceptor";
import type { CotasaoDto } from "./dto/CotasaoDto";
import { FaPercentage } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function Swap() {
  const [swap, setSwap] = useState({
    tokenFrom: "BTC",
    tokenTo: "BRL",
    amount: 0,
  });

  const [cota, setCota] = useState({
    calculado: false,
    cotasao: 0,
    taxa: 0,
    quantidadeDestino: 0,
  });

  function validarSwap(): boolean {
    return (
      swap.amount > 0 &&
      swap.tokenFrom !== "" &&
      swap.tokenTo !== "" &&
      swap.tokenFrom !== swap.tokenTo
    );
  }

  function cotarSwap(): void {
    if (!validarSwap()) return;
    axiosHttp.post("/swap/cota", swap).then((response) => {
      const swapCotasao: CotasaoDto = response.data;
      setCota({
        ...cota,
        calculado: true,
        cotasao: swapCotasao.cotasao,
        taxa: swapCotasao.taxa,
        quantidadeDestino: swapCotasao.quantidadeDestino,
      });
    });
  }

  function efetuarSwap(): void {
    if (!validarSwap()) return;
    axiosHttp.post("/swap/efetuar-swap", swap).then((response) => {
      if (response.status === 201) {
        alert("Swap efetuado com sucesso");
      } else {
        alert("Ocorreu um erro ao efetuar o swap");
      }
    });
  }

  return (
    <>
      <main className="border-white-500 border-2 rounded w-auto h-auto p-10 gap-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">
            Swap - <strong>CONVERSÃO ENTRE TOKENS</strong>
          </h2>
          <p>Conversão de tokens de uma moeda para outra.</p>
        </div>
        <form className="flex gap-4 items-end">
          <div className="flex gap-4 flex-1">
            <div className="flex gap-4 flex-col flex-1">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                type="number"
                name="quantidade"
                step={0.1}
                value={swap.amount}
                onChange={(e) => {
                  setSwap({ ...swap, amount: Number(e.target.value) });
                }}
                id="quantidade"
                className="border-2 border-gray-400 p-2 rounded flex-1"
              />
            </div>
            <div className="flex gap-4 flex-col flex-1">
              <label htmlFor="tipo">Converter de...</label>
              <select
                name="tipo"
                id="tipo"
                className="border-2 border-gray-400 p-2 rounded flex-1"
                value={swap.tokenFrom}
                onChange={(e) => {
                  setSwap({ ...swap, tokenFrom: e.target.value });
                }}
              >
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
          <h2 className="text-2xl font-bold"> X </h2>
          <div className="flex gap-4 flex-col flex-1">
            <label htmlFor="tipo">Converter para...</label>
            <select
              name="tipo"
              id="tipo"
              className="border-2 border-gray-400 p-2 rounded flex-1"
              value={swap.tokenTo}
              onChange={(e) => {
                setSwap({ ...swap, tokenTo: e.target.value });
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
        </form>
        <div className="mt-5 mb-5">
          <h3 className="text-2xl font-bold text-center">
            Resultado da Cotasão
          </h3>
          {cota.calculado && (
            <div className="flex flex-wrap gap-6">
              <hr className="w-full mt-5 mb-5" />
              <span className="flex g-10 items-center flex-1 border-2 border-gray-400 p-2 rounded">
                <MdOutlineAttachMoney className="text-green-500 mr-2 text-4xl" />{" "}
                <input
                  type="text"
                  disabled
                  value={"Cotasão -> " + cota.cotasao}
                  className="flex-1"
                />
              </span>
              <span className="flex g-10 items-center flex-1 border-2 border-gray-400 p-2 rounded">
                <FaPercentage className="text-green-500 mr-2 text-4xl" />
                <input
                  type="text"
                  disabled
                  value={"Taxa -> " + cota.taxa}
                  className="flex-1"
                />
              </span>
              <span className="flex g-10 items-center flex-1 border-2 border-gray-400 p-2 rounded">
                <FaCoins className="text-green-500 mr-2 text-4xl" />
                <input
                  type="text"
                  disabled
                  value={"Valor Final -> " + cota.quantidadeDestino}
                  className="flex-1"
                />
              </span>
              <hr className="w-full mt-5 mb-5" />
            </div>
          )}
        </div>
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!validarSwap()}
          onClick={cotarSwap}
        >
          Cotar
        </button>
        <div className="flex items-center">
          <span className="flex-1 h-px  bg-gray-400"></span>
          <span className="text-center px-4">Ou</span>
          <span className="flex-1 h-px bg-gray-400"></span>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!validarSwap()}
          onClick={efetuarSwap}
        >
          Efetuar Swap
        </button>
      </main>
    </>
  );
}
