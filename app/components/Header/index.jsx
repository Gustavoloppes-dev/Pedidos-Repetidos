import { IoIosSearch } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import Image from "next/image";
import User from "../../../public/image/user.png";
import { FaChevronRight } from "react-icons/fa";

export default function Header() {
  return(
    <header className="col-span-4 col-start-2 row-span-1 row-start-1 px-4 py-4 bg-branco max-w-[1920px] w-full flex justify-between items-center text-preto-sm">
      <div className="text-preto-sm relative">
        <input
          className="w-[500px] pl-14 pr-4 border border-cinza-border focus:outline-none py-[10px] text-sm rounded-[19px] placeholder:text-preto-sm"
          type="search"
          placeholder="Pesquisar"
          name=""
          id=""
        />
        <IoIosSearch className="absolute top-[9px] left-3" size={24} />
      </div>
      <div className="text-preto-sm flex items-center relative">
        <div className="">
          <BsBellFill size={30} />
        </div>
        <span className="bg-vermelho p-1 text-[10px] text-center rounded-full text-branco absolute -top-[5px] -right-[6px]">
          12
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Image src={User} alt="" />
        </div>
        <div>
          <p className="text-sm font-bold">Moni Roy</p>
          <p className="text-xs font-semibold text-cinza-medio">Admin</p>
        </div>
        <div className="border border-cinza-medio p-2 flex justify-center items-center rounded-full">
          <FaChevronRight size={10} className="text-cinza-medio rotate-90" />
        </div>
      </div>
    </header>
  )
}