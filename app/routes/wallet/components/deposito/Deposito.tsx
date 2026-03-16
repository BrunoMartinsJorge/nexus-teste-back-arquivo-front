"use client";
import { useEffect, useState } from "react";
import axiosHttp from "~/shared/utils/interceptor";
import type { UsuarioDto } from "./models/UsuarioDto";

interface DepositoProps {
  onChange: () => void;
}

export default function Deposito({ onChange }: DepositoProps) {
  const [deposito, setDeposito] = useState({
    amount: 0,
    token: "BRL",
    idempotencyKey: "",
    userId: 0,
  });

  const [usuarios, setUsuarios] = useState([
    {
      id: 0,
      nome: "",
    },
  ]);

  const gerarIdempotencyKey = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  function validarDeposito(): boolean {
    return (
      deposito.amount > 0 &&
      deposito.token !== "" &&
      deposito.idempotencyKey !== "" &&
      deposito.userId != null
    );
  }

  function buscarUsuarios(): void {
    setUsuarios([]);
    axiosHttp.get("/webhook/usuarios").then((response) => {
      if (response.status === 200) {
        setUsuarios(response.data);
        if (response.data.length > 0) {
          setDeposito({
            ...deposito,
            userId: response.data[0].id,
            idempotencyKey: gerarIdempotencyKey(),
          });
        }
      }
    });
  }

  useEffect(() => {
    setDeposito({ ...deposito, idempotencyKey: gerarIdempotencyKey() });
    buscarUsuarios();
  }, []);

  async function enviarDeposito(): Promise<void> {
    try {
      const response = await axiosHttp.post("/webhook/deposit", deposito);
      if (response.status === 201) {
        onChange?.();
      } else {
        console.error(response.data);
        alert(response.data.message || "Ocorreu um erro ao gerar o deposito!");
        return Promise.reject(response);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <main className="border-white-500 border-2 rounded w-auto h-auto p-10 gap-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Gerar Deposito</h2>
          <p>
            Aqui voce pode gerar um deposito para testes da{" "}
            <i className="text-blue-300 text-1x2">/webhoock/deposit</i>
          </p>
        </div>
        <form className="grid grid-cols-2 gap-4">
          <div className="flex gap-4 flex-col flex-1">
            <label htmlFor="quantidade">Quantidade</label>
            <input
              type="number"
              name="quantidade"
              value={deposito.amount}
              onChange={(e) => {
                setDeposito({ ...deposito, amount: Number(e.target.value) });
              }}
              id="quantidade"
              className="border-2 border-gray-400 p-2 rounded flex-1"
            />
          </div>
          <div className="flex gap-4 flex-col flex-1">
            <label htmlFor="tipo">Tipo</label>
            <select
              name="tipo"
              id="tipo"
              className="border-2 border-gray-400 p-2 rounded flex-1"
              value={deposito.token}
              onChange={(e) => {
                setDeposito({ ...deposito, token: e.target.value });
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
          <div className="flex gap-4 flex-col flex-1">
            <label htmlFor="tipo">User Id</label>
            <select
              name="tipo"
              id="tipo"
              className="border-2 border-gray-400 p-2 rounded flex-1"
              value={deposito.token}
              onChange={(e) => {
                setDeposito({ ...deposito, token: e.target.value });
              }}
            >
              {usuarios.map((u: UsuarioDto) => {
                return (
                  <option
                    key={u.id}
                    value={u.id}
                    className="border-2 border-gray-400 p-2 rounded flex-1 bg-white dark:bg-gray-900"
                  >
                    {u.nome} - ID: {u.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-4 flex-col flex-1">
            <label htmlFor="idempotencyKey">Idempotency Key</label>
            <div className="flex gap-4">
              <input
                type="string"
                name="idempotencyKey"
                id="idempotencyKey"
                value={deposito.idempotencyKey}
                onChange={(e) => {
                  setDeposito({ ...deposito, idempotencyKey: e.target.value });
                }}
                className="border-2 border-gray-400 p-2 rounded flex-1"
              />
              <button
                type="button"
                onClick={() => {
                  setDeposito({
                    ...deposito,
                    idempotencyKey: gerarIdempotencyKey(),
                  });
                }}
                className="border-2 border-gray-400 p-2 rounded flex-1 cursor-pointer"
              >
                Gerar
              </button>
            </div>
          </div>
        </form>
        <hr />
        <button
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-full cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!validarDeposito()}
          onClick={enviarDeposito}
        >
          Enivar Deposito
        </button>
      </main>
    </>
  );
}
