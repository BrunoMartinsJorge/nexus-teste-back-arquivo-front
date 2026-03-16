"use client";

import axiosHttp from "~/shared/utils/interceptor";
import { useState, useEffect } from "react";
import type { TransacaoDto } from "./models/TransacaoDto";

export default function Transacao() {
  const [transacoes, setTransacoes] = useState({} as TransacaoDto);
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: 10,
  });

  useEffect(() => {
    buscarTransacoes();
  }, [paginacao]);

  function buscarTransacoes() {
    axiosHttp
      .get(`/transacoes/pagina${paginacao.pagina}/limite${paginacao.limite}`)
      .then((response) => {
        if (response.status === 200) {
          if (paginacao.pagina > response.data.totalPages) {
            setPaginacao({
              ...paginacao,
              pagina: response.data.totalPages,
            });
          } else {
            setTransacoes(response.data);
          }
        } else {
          alert("Ocorreu um erro ao buscar as transações!");
        }
      });
  }

  function alterarPagina(pagina: number): void {
    setPaginacao({ ...paginacao, pagina });
  }

  function alterarLimite(limite: number): void {
    setPaginacao({ ...paginacao, limite });
  }

  return (
    <>
      <main className="border-white-500 border-2 rounded w-auto h-auto p-10 gap-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Transações</h2>
          <p>Histórico de transações</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-300">
                <th className="py-3 px-4 text-left">Token Origem</th>
                <th className="py-3 px-4 text-left">Token Destino</th>
                <th className="py-3 px-4 text-left">Saldo Anterior</th>
                <th className="py-3 px-4 text-left">Saldo Atual</th>
                <th className="py-3 px-4 text-left">Taxa</th>
                <th className="py-3 px-4 text-left">Tipo</th>
                <th className="py-3 px-4 text-left">Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {transacoes?.data?.map((transacao: any) => (
                <tr
                  key={transacao.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">
                    {transacao.tokenFrom}
                  </td>

                  <td className="py-3 px-4 text-zinc-400">
                    {transacao.tokenTo}
                  </td>

                  <td className="py-3 px-4">
                    {transacao.valorFrom} Unidade(s)
                  </td>

                  <td className="py-3 px-4">{transacao.valorTo} Unidade(s)</td>

                  <td className="py-3 px-4 font-semibold">{transacao.taxa}%</td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-md text-xs bg-zinc-700">
                      {transacao.tipo}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(transacao.dataHora).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>
                  <div className="flex justify-end gap-2 mt-4 overflow-x-auto">
                    <select
                      className="border-2 border-gray-400 p-2 rounded"
                      onChange={(e) => alterarLimite(Number(e.target.value))}
                    >
                      <option
                        value="10"
                        className="border-2 border-gray-400 p-2 rounded flex-1 bg-black"
                      >
                        10
                      </option>
                      <option
                        value="25"
                        className="border-2 border-gray-400 p-2 rounded flex-1 bg-black"
                      >
                        25
                      </option>
                      <option
                        value="50"
                        className="border-2 border-gray-400 p-2 rounded flex-1 bg-black"
                      >
                        50
                      </option>
                      <option
                        value="100"
                        className="border-2 border-gray-400 p-2 rounded flex-1 bg-black"
                      >
                        100
                      </option>
                    </select>
                    {Array.from(
                      { length: transacoes.totalPages || 0 },
                      (_, index) => index + 1,
                    ).map((pagina) => (
                      <button
                        key={pagina}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-14 cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => alterarPagina(pagina)}
                        disabled={pagina === Number(transacoes.page)}
                      >
                        {pagina}
                      </button>
                    ))}
                  </div>

                  <i className="text-zinc-400 block text-right mt-2">
                    {transacoes.total} Movimentações
                  </i>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>
    </>
  );
}
