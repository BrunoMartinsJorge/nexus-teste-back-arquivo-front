"use client";

import { useState, useEffect } from "react";
import axiosHttp from "~/shared/utils/interceptor";
import type { Movimentacao, MovimentacaoDto } from "./models/MovimentacaoDto";

export default function Movimentacao() {
  const [movimentacoes, setMovimentacoes] = useState({} as MovimentacaoDto);
  const [paginacao, setPaginacao] = useState({
    pagina: 1,
    limite: 10,
  });

  useEffect(() => {
    buscarMovimentacoes();
  }, [paginacao]);

  function buscarMovimentacoes(): void {
    axiosHttp
      .get(`/movimentacoes/pagina${paginacao.pagina}/limite${paginacao.limite}`)
      .then((response) => {
        if (response.status === 200) {
          if (paginacao.pagina > response.data.totalPages) {
            setPaginacao({
              ...paginacao,
              pagina: response.data.totalPages,
            });
          }
          setMovimentacoes(response.data);
        } else {
          alert("Ocorreu um erro ao buscar as movimentações!");
        }
      });
  }

  function alterarPagina(pagina: number): void {
    setPaginacao({ ...paginacao, pagina: pagina });
  }

  function alterarLimite(limite: number): void {
    setPaginacao({ ...paginacao, limite: limite });
  }

  return (
    <>
      <main className="border-white-500 border-2 rounded w-auto h-auto p-10 gap-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold">Movimentações</h2>
          <p>Histórico de movimentações</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-700 text-zinc-300">
                <th className="text-left py-3 px-4">Token</th>
                <th className="text-left py-3 px-4">Data / Hora</th>
                <th className="text-left py-3 px-4">Saldo Anterior</th>
                <th className="text-left py-3 px-4">Saldo Novo</th>
                <th className="text-left py-3 px-4">Valor</th>
                <th className="text-left py-3 px-4">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes?.data?.map((movimentacao: Movimentacao) => (
                <tr
                  key={movimentacao.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">
                    {movimentacao.token}
                  </td>

                  <td className="py-3 px-4 text-zinc-400">
                    {new Date(movimentacao.dataHora).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    {movimentacao.saldoAnterior} Unidade(s)
                  </td>

                  <td className="py-3 px-4">
                    {movimentacao.saldoNovo} Unidade(s)
                  </td>

                  <td className="py-3 px-4 font-semibold">
                    {movimentacao.valor} Unidade(s)
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-md text-xs bg-zinc-700">
                      {movimentacao.tipo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}>
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
                      { length: movimentacoes.totalPages || 0 },
                      (_, index) => index + 1,
                    ).map((pagina) => (
                      <button
                        key={pagina}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 w-14 cursor-pointer transition ease-in duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => alterarPagina(pagina)}
                        disabled={pagina === Number(movimentacoes.page)}
                      >
                        {pagina}
                      </button>
                    ))}
                  </div>
                  <i className="text-zinc-400 items-end justify-end flex mt-2">
                    {movimentacoes.total} Movimentações
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
