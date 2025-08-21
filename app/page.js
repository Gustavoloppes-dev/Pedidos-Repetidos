"use client";

import Image from "next/image";
import PedidosCards from "./components/pedidosCards";
import { useEffect, useState } from "react";
import ModalAlerta from "./components/ModalAlerta";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Home() {
  const [pedidos, setPedidos] = useState([
    // { numero: "v4504886fid-01", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-02", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-03", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-04", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-05", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-06", data: "01-08", hora: "15:47", unico: true },
  ]);

  const [pedidosApi, setPedidosApi] = useState([]);
  const url =
    "https://script.google.com/macros/s/AKfycbwJV4JQSFDO9N7aKZ4nbckIE7qnsyNk-SachW_r17jZ0TitlzzUnYFnmp_rON807hdJ/exec";

  useEffect(() => {
    console.log("useEffect rodando");

    async function buscarPedidos() {
      try {
        const response = await axios.get(url);
        const pedidosData = response.data; // ⚠️ pode não ser "data"
        console.log("✅ Dados recebidos:", pedidosData);

        localStorage.setItem("pedidos", JSON.stringify(pedidosData));
        setPedidosApi(pedidosData);
      } catch (error) {
        console.error("❌ Erro ao buscar pedidos:", error);
      }
    }

    buscarPedidos();
  }, []);

  const [novoPedido, setNovoPedido] = useState("");
  const [modalAberta, setmodalAberta] = useState(false);
  const [romaneio, setRomaneio] = useState([]);

  const excluirPedido = (numero) => {
    setRomaneio((prev) => prev.filter((pedido) => pedido.numero !== numero));
    localStorage.setItem(
      "romaneio",
      JSON.stringify(romaneio.filter((pedido) => pedido.numero !== numero))
    );
  };

  const enviarPedido = (e) => {
    e.preventDefault();
    if (!novoPedido.trim()) return;

    // const pedidoExiste = pedidosApi.some((pedido) => pedido.numero === novoPedido);
    const pedidoExiste = pedidosApi.some((pedido) => {
      return pedido.Pedido === novoPedido;
    });

    console.log(pedidoExiste);

    if (pedidoExiste) {
      // teste
      const duplicado = {
        // id: Math.random().toString(36).substring(2, 9),
        // id: Date.now(),
        numero: novoPedido,
        data: dataHoje(),
        hora: horaAgora(),
        unico: false,
      };

      setRomaneio((prev) => [...prev, duplicado]);
      setmodalAberta(true);
    } else {
      const pedidoObjeto = {
        // id: Date.now(),
        numero: novoPedido,
        data: dataHoje(),
        hora: horaAgora(),
        unico: true,
        transportadora,
      };
      setRomaneio((pedido) => [...pedido, pedidoObjeto]);
      console.log("✅ Pedido cadastrado:", romaneio);
    }

    setNovoPedido("");
  };

  function dataHoje() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    return `${dia}-${mes}`;
  }

  function horaAgora() {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    localStorage.setItem("romaneio", JSON.stringify(romaneio));
  }, [romaneio]);

  useEffect(() => {
    const romaneioSalvo = localStorage.getItem("romaneio");
    if (romaneioSalvo) {
      setRomaneio(JSON.parse(romaneioSalvo));
    }
  }, []);

  const [transportadora, setTransportadora] = useState("J&T");

  const gerarPlanilha = () => {
    if (romaneio.length === 0) return alert("Romaneio vazio!");

    const ws = XLSX.utils.json_to_sheet(romaneio);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Romaneio");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `romaneio_${dataHoje()}.xlsx`);
  };

  const imprimirRomaneio = () => {
    if (romaneio.length === 0) return alert("Romaneio vazio!");

    const conteudo = `
    <html>
      <head>
        <title>Romaneio</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          .assinatura { margin-top: 50px; display: flex; justify-content: space-between; }
          .linha { border-top: 1px solid #000; width: 40%; text-align: center; padding-top: 5px; }
        </style>
      </head>
      <body>
        <h2>Romaneio - ${dataHoje()}</h2>
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Transportadora</th>
            </tr>
          </thead>
          <tbody>
            ${romaneio
              .map(
                (p) => `
              <tr>
                <td>${p.numero}</td>
                <td>${p.data}</td>
                <td>${p.hora}</td>
                <td>${p.transportadora || "-"}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <div class="assinatura">
          <div class="linha">Assinatura 1</div>
          <div class="linha">Assinatura 2</div>
        </div>
      </body>
    </html>
  `;

    const janela = window.open("", "_blank");
    janela.document.write(conteudo);
    janela.document.close();
    janela.print();
  };

  console.log(pedidosApi);

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <h1 className="font-bold text-5xl pb-4">Pedidos</h1>
      {/* <select
        value={transportadora}
        onChange={(e) => setTransportadora(e.target.value)}
        className="text-cinza-fonte-sm px-4 py-[15px] bg-cinza-claro-sm rounded-[8px] focus:shadow-none focus:outline-none"
      >
        <option value="J&T">J&amp;T</option>
        <option value="Loggi">Loggi</option>
        <option value="Total Express">Total Express</option>
      </select> */}
      <div className="flex gap-3">
        <div className="bg-menu-bg px-[38px] py-8 rounded-xl">
          <div>
            <ul className="flex">
              <li className="pr-[35px]">Status</li>
              <li className="pr-[114px]">Nº Pedido</li>
              <li className="pr-[74px]">Data</li>
              <li className="pr-">Hora</li>
            </ul>
            <span className="block h-0.5 w-full bg-preto mt-1 mb-7"></span>
          </div>
          <div className="bg-menu-bg  h-[486px] rounded-[20px] flex flex-col gap-6 pr-3 overflow-y-auto">
            {romaneio.map((pedido, index) => (
              <PedidosCards
                key={index}
                id={pedido.numero}
                numero={pedido.numero}
                data={pedido.data}
                hora={pedido.hora}
                unico={pedido.unico}
                deletar={() => excluirPedido(pedido.numero)}
              />
            ))}
          </div>
        </div>
        <div className="">
          <form
            className="bg-menu-bg h-16 rounded-[10px] flex items-center justify-center gap-3 flex-row"
            onSubmit={enviarPedido}
          >
            <input
              placeholder="Digite o codigo do pedido"
              className="text-cinza-fonte-sm px-4 py-[15px] bg-cinza-claro-sm rounded-[8px]
        focus:shadow-none focus:outline-none"
              type="text"
              onChange={(e) => setNovoPedido(e.target.value)}
              value={novoPedido}
            />
          </form>
          <div className="flex gap-4 mt-4 h-[50px] flex-wrap">
            <select
              value={transportadora}
              onChange={(e) => setTransportadora(e.target.value)}
              className="px-4 py-[15px] bg-cinza-claro-sm rounded-[8px] "
            >
              <option value="J&T">J&amp;T</option>
              <option value="Loggi">Loggi</option>
              <option value="Total Express">Total Express</option>
            </select>

            <button
              onClick={gerarPlanilha}
              className="px-4 py-2 bg-azul text-white rounded-[8px]"
            >
              Gerar Planilha
            </button>
            <button
              onClick={imprimirRomaneio}
              className="px-4 py-2 bg-preto text-white rounded-[8px]"
            >
              Imprimir Romaneio
            </button>
          </div>
        </div>
      </div>
      <ModalAlerta
        aberto={modalAberta}
        fechar={() => setmodalAberta(false)}
        pedido={novoPedido}
      />
    </section>
  );
}
