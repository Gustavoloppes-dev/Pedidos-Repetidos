"use client";

import { useEffect, useRef } from "react";

export default function ModalAlerta({aberto, fechar, pedido}) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (aberto && audioRef.current) {
      audioRef.current.currentTime = 0; // garante início do áudio
      audioRef.current.play().catch((err) => console.log("Erro ao tocar áudio:", err));
    } else if (!aberto && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // volta pro início
    }
  }, [aberto]);

  if (!aberto) return null;

  return (
    <div className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center cursor-pointer">
      <audio ref={audioRef} src="/audio/alarm.mp3" loop preload="auto"/>
      <div
        className={
          "bg-menu-bg flex flex-col items-center justify-start pt-6 pb-10 px-12 rounded-[14px] overflow-y-auto max-h-[80vh] cursor-default"
        }
        onClick={(e) => e.stopPropagation()} // evita fechar clicando no conteúdo
      >
        <div className="flex flex-col justify-center w-[540px] text-center">
          <h1 className="text-2xl font-semibold pt-2 text-red-600">
            Pedido Duplicado
          </h1>
          <p className="mt-4 text-cinza-fonte-sm">
            O pedido <strong>{pedido}</strong> já foi registrado.
          </p>

          <div className="flex justify-center pt-9">
            <button
              onClick={fechar}
              className="w-[45%] font-bold py-3 text-branco bg-vermelho rounded-[10px] uppercase cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
