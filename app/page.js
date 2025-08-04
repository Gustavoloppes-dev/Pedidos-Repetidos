"use client";

import Image from "next/image";
import PedidosCards from "./components/pedidosCards";
import { useState } from "react";
import ModalAlerta from "./components/ModalAlerta";

export default function Home() {
  const [pedidos, setPedidos] = useState([
    // { numero: "v4504886fid-01", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-02", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-03", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-04", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-05", data: "01-08", hora: "15:47", unico: true },
    // { numero: "v4504886fid-06", data: "01-08", hora: "15:47", unico: true },
  ]);

  const [novoPedido, setNovoPedido] = useState("");
  const [modalAberta, setmodalAberta] = useState(false);

  const excluirPedido = (numero, hora) => {
    setPedidos((prev) =>
      prev.filter(
        (pedido) => !(pedido.numero === numero && pedido.hora === hora)
      )
    );
  };

  const enviarPedido = (e) => {
    e.preventDefault();
    if (!novoPedido.trim()) return;

    const pedidoExiste = pedidos.some((pedido) => pedido.numero === novoPedido);

    if (pedidoExiste) {
      // teste
      const duplicado = {
        numero: novoPedido,
        data: dataHoje(),
        hora: horaAgora(),
        unico: false,
      };

      setPedidos(prev => [...prev, duplicado]);
      setmodalAberta(true);
    } else {
      const pedidoObjeto = {
        numero: novoPedido,
        data: dataHoje(),
        hora: horaAgora(),
        unico: true
      };
      setPedidos((pedido) => [...pedido, pedidoObjeto]);
      console.log("✅ Pedido cadastrado:", pedidoObjeto);
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

  return (
    <section className="flex flex-col justify-center items-center h-full">
      <h1 className="font-bold text-5xl pb-4">Pedidos</h1>
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
            {pedidos.map((pedido, index) => (
              <PedidosCards
                key={index}
                numero={pedido.numero}
                data={pedido.data}
                hora={pedido.hora}
                unico={pedido.unico}
                deletar={() => excluirPedido(pedido.numero, pedido.hora)}
              />
            ))}
          </div>
        </div>
        <form
          className="bg-menu-bg h-16 rounded-[10px] flex items-center justify-center"
          onSubmit={enviarPedido}
        >
          <input
            placeholder="Digite o codigo do pedido"
            className="text-cinza-fonte-sm px-4 py-[15px] bg-cinza-claro-sm rounded-[8px]
                focus:shadow-none focus:outline-none"
            type="text"
            id="nome"
            onChange={(e) => setNovoPedido(e.target.value)}
            value={novoPedido}
            autoFocus
          />
        </form>
      </div>
      <ModalAlerta
        aberto={modalAberta}
        fechar={() => setmodalAberta(false)}
        pedido={novoPedido}
      />
    </section>
  );
}
