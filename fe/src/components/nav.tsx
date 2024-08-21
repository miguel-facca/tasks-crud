import { Dispatch, SetStateAction } from "react";

export function Nav({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  const setModal = useModalStore((state) => state.setIsOpen);

  return (
    <nav className="max-w-[40rem] w-96 h-10 mt-4 flex items-center">
      <input
        className="bg-zinc-900 h-full w-[85%] border border-solid border-zinc-700 outline-none text-base text-white placeholder:text-white/60 px-3"
        placeholder="Pesquise"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <button
        className="h-full flex items-center justify-center w-[10%] ml-[2%] bg-zinc-900 border border-solid border-zinc-700 text-2xl text-white"
        onClick={() => setModal(true)}
      >
        <CreateSvg />
      </button>
    </nav>
  );
}

import type { SVGProps } from "react";
import { useModalStore } from "../stores/modal";

export function CreateSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60%"
      height="60%"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="white"
        d="M464.37 49.2a22.07 22.07 0 0 0-31.88-.76l-18.31 18.25l31.18 31.1l18-17.91a22.16 22.16 0 0 0 1.01-30.68M252.76 336H176v-76.76l9.4-9.38L323.54 112H48v352h352V188.46L262.14 326.6zM400 143.16l32.79-32.86l-31.09-31.09L368.85 112H400z"
      ></path>
      <path
        fill="white"
        d="M208 304h31.49L400 143.16V112h-31.15L208 272.51z"
      ></path>
    </svg>
  );
}
