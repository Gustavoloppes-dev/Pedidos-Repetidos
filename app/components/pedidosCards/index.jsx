import { MdDelete } from "react-icons/md";

export default function PedidosCards({ numero, data, hora, unico, deletar }) {
  return (
    // <div className="bg-bg-cinza-claro flex items-center gap-6 py-2 rounded-[13px] px-3">
    //   <span className="bg-verde h-[44px] w-2"></span>
    //   <div className="flex justify-center gap-11">
    //     <span className="text-2xl">{numero}</span>
    //     <span className="text-2xl">{data}</span>
    //     <span className="text-2xl">{hora}</span>
    //     <button>
    //       <MdDelete />
    //     </button>
    //   </div>
    // </div>
    <div
      className={`flex items-center gap-6 py-2 rounded-[13px] px-3 transition-colors ${
        unico ? "bg-bg-cinza-claro text-black" : "bg-vermelho text-branco"
      }`}
    >
      <span
        className={`h-[44px] w-2 rounded ${
          unico ? "bg-verde" : "bg-amarelo"
        }`}
      ></span>
      <div className="flex justify-center gap-11 items-center">
        <span className="text-2xl">{numero}</span>
        <span className="text-2xl">{data}</span>
        <span className="text-2xl">{hora}</span>
        <button
          onClick={deletar}
          className="p-2 hover:scale-110 transition-transform"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
