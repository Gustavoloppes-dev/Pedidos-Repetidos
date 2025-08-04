import Image from "next/image";
import logo from "../../../public/image/Logo.png";
import Link from "next/link";
import { BiSolidDashboard } from "react-icons/bi";
import { MdBarChart } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

export default function AsideNav() {
  return (
    <section className="flex flex-col row-span-5 h-dvh bg-branco px-5 py-5">
      <div className="flex flex-col items-center pb-5">
        <Image width={70} height={67} src={logo}  alt="Logo"/>
        <div className="h-[1px] bg-preto w-full mt-5"></div>
      </div>

      <nav className="flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-4 relative xl:gap-2">
          <Link
            href="/"
            // onClick={() => setMenuNirAtivo(menuNirAtivo === "Home" ? null : "Home")}
            className={`py-[12px] px-3 flex items-center gap-4 font-medium rounded-lg xl:py-2 hover:shadow-[0_1px_4px_rgba(0,_0,_0,_2.5)] hover:text-azul`}
          >
            <BiSolidDashboard size={24} />
            <span className="font-bold">Home</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 relative xl:gap-2">
          <Link
            href="/pedidos"
            // onClick={() => setMenuNirAtivo(menuNirAtivo === "Home" ? null : "Home")}
            className={`py-[12px] px-3 flex items-center gap-4 font-medium rounded-lg xl:py-2 hover:shadow-[0_1px_4px_rgba(0,_0,_0,_2.5)] hover:text-azul`}
          >
            <TbReport size={24} />
            <span className="font-bold">Pedidos</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 relative xl:gap-2">
          <Link
            href="/"
            // onClick={() => setMenuNirAtivo(menuNirAtivo === "Home" ? null : "Home")}
            className={`py-[12px] px-3 flex items-center gap-4 font-medium rounded-lg xl:py-2 hover:shadow-[0_1px_4px_rgba(0,_0,_0,_2.5)] hover:text-azul`}
          >
            <MdBarChart size={24} />
            <span className="font-bold">Relatorio</span>
          </Link>
        </div>
      </nav>

      <div className="mt-auto">
        <div className="h-[1px] bg-preto w-full mt-5"></div>
        <button
          // onClick={logout}
          className="mt-5 px-3 flex items-center gap-4 font-medium text-preto rounded-[30px] hover:text-azul cursor-pointer"
        >
          <MdLogout size={32} />
          <span className="">Logout</span>
        </button>
      </div>
    </section>
  );
}
