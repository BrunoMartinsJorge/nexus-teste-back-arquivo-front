import { useEffect, useState } from "react";
import Header from "./components/Header";
import { FaEthereum } from "react-icons/fa";
import { RiBitCoinFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import type { WalletDto } from "./models/WalletDto";
import Deposito from "./components/deposito/Deposito";
import Swap from "./components/swap/Swap";
import Saque from "./components/saque/Saque";
import Movimentacao from "./components/movimentacao/Movimentacao";
import Transacao from "./components/transacao/Transacao";
import { jwtDecode } from "jwt-decode";
import axiosHttp from "~/shared/utils/interceptor";

export default function Wallet() {
  const [trigger, setTrigger] = useState(false);
  const [saldos, setSaldos] = useState({
    id: 0,
    brl: {
      id: 0,
      quantidade: 0,
      tipo: "",
      nome: "",
    },
    btc: {
      id: 0,
      quantidade: 0,
      tipo: "",
      nome: "",
    },
    eth: {
      id: 0,
      quantidade: 0,
      tipo: "",
      nome: "",
    },
  });

  const btnTopVisivel = () => {
    if (window.scrollY > 300) {
      document.getElementById("btnTop")?.classList.remove("esconder");
    } else {
      document.getElementById("btnTop")?.classList.add("esconder");
    }
  };

  async function buscarSaldos(): Promise<void> {
    try {
      const response = await axiosHttp.get("/wallet");
      if (response.status === 200) {
        formatarDto(response.data);
      } else {
        console.error(response.data);
        return Promise.reject(response);
      }
    } catch (e) {
      console.error(e);
    }
    setTrigger(!trigger);
  }

  useEffect(() => {
    autenticado();
    const handleScroll = () => btnTopVisivel();
    window.addEventListener("scroll", handleScroll);
    buscarSaldos();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function formatarDto(res: WalletDto): void {
    const novosSaldos = {
      id: res.id,
      brl: { ...saldos.brl },
      btc: { ...saldos.btc },
      eth: { ...saldos.eth },
    };

    res.balance.forEach((item) => {
      const saldo = {
        id: item.id,
        quantidade: item.saldo,
        tipo: item.tipo,
        nome: tituloConverte(item.tipo),
      };

      switch (item.tipo) {
        case "BRL":
          novosSaldos.brl = saldo;
          break;
        case "BTC":
          novosSaldos.btc = saldo;
          break;
        case "ETH":
          novosSaldos.eth = saldo;
          break;
      }
    });

    setSaldos(novosSaldos);
  }

  let tituloConverte = (tipo: string) => {
    switch (tipo) {
      case "BRL":
        return "BRL";
      case "BTC":
        return "BitCoin";
      case "ETH":
        return "Ethereum";
      default:
        return "BRL";
    }
  };

  async function autenticado() {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const payload: any = jwtDecode(token);
    if (payload.exp * 1000 < Date.now()) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        window.location.href = "/login";
        return;
      }
      const payloadRefresh: any = jwtDecode(refreshToken);
      if (payloadRefresh.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        return;
      }
      try {
        const response = await axiosHttp.post("/auth/refresh", {
          refreshToken,
        });
        localStorage.setItem("access_token", response.data.access_token);
      } catch {
        window.location.href = "/login";
        return;
      }
    }
    buscarSaldos();
  }

  return (
    <>
      <Header recarregarSaldo={trigger}></Header>
      <main className="flex flex-col gap-10 p-10">
        <div className="flex flex-wrap gap-10">
          <div className="flex items-center justify-center gap-10 border-white-500 border-2 rounded w-1/3 h-auto p-10 min-h-50 flex-1 min-w-75">
            <span className="text-7xl">
              <BsCashCoin></BsCashCoin>
            </span>
            <span>
              <h3>Valor em Real (BRL)</h3>
              <strong>{saldos.brl.quantidade} Unidade(s)</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 border-white-500 border-2 rounded w-1/3 h-auto p-10 min-h-50 flex-1 min-w-75">
            <span className="text-7xl">
              <RiBitCoinFill></RiBitCoinFill>
            </span>
            <span>
              <h3>BitCoin</h3>
              <strong>{saldos.btc.quantidade} Unidade(s)</strong>
            </span>
          </div>
          <div className="flex items-center justify-center gap-10 border-white-500 border-2 rounded w-1/3 h-auto p-10 min-h-50 flex-1 min-w-75">
            <span className="text-7xl">
              <FaEthereum></FaEthereum>
            </span>
            <span>
              <h3>Ethereum</h3>
              <strong>{saldos.eth.quantidade} Unidade(s)</strong>
            </span>
          </div>
        </div>
        <hr />
        <Deposito onChange={buscarSaldos} />
        <hr />
        <Swap />
        <hr />
        <Saque onChange={buscarSaldos} />
        <hr />
        <Movimentacao />
        <hr />
        <Transacao />
        <button
          id="btnTop"
          className="esconder fixed bottom-5 right-5 bg-green-500 text-white p-2 rounded hover:bg-green-700 cursor-pointer transition ease-in duration-200 w-10 h-10"
          onClick={() => window.scrollTo(0, 0)}
        >
          ↑
        </button>
      </main>
    </>
  );
}
