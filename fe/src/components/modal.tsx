import clsx from "clsx";
import { RefObject, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { http } from "../libs/axios";
import { useModalStore } from "../stores/modal";
import { TaskProps } from "./task";

export function Modal({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}) {
  const [isOpen, setModal] = useModalStore((state) => [
    state.isOpen,
    state.setIsOpen,
  ]);

  const titleRef = useRef() as RefObject<HTMLInputElement>;
  const contentRef = useRef() as RefObject<HTMLTextAreaElement>;

  useEffect(() => {
    const root = document.getElementById("root");
    const listener = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", listener);
      return root!.setAttribute(
        "style",
        "filter: blur(6px); transition: all .22s;"
      );
    }

    window.removeEventListener("keydown", listener);
    root!.setAttribute("style", "filter: blur(0px); transition: all .22s;");
  }, [isOpen, setModal]);

  const handleCreateTask = async () => {
    if (
      !titleRef.current ||
      titleRef.current.value.length <= 0 ||
      !contentRef.current ||
      contentRef.current.value.length <= 0
    )
      return;

    const resp = await http.post("tasks", {
      title: titleRef.current.value,
      content: titleRef.current.value,
    });

    if (!resp.data) return false;

    setTasks((prevState) => [
      ...prevState,
      {
        id: resp.data.id,
        title: titleRef.current!.value,
        content: contentRef.current!.value,
      },
    ]);
    setModal(false);
  };

  return createPortal(
    <div
      className={clsx(
        "w-96 h-fit bg-black border-2 border-solid border-zinc-700 p-4 absolute left-[50vw] top-[50vh] -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}
    >
      <h1 className="text-white text-3xl font-bold text-center uppercase">
        Nova task
      </h1>
      <input
        className="bg-zinc-900 h-8 w-[92.5%] left-1/2 relative -translate-x-1/2 mt-4 border border-solid border-zinc-700 outline-none text-base text-white placeholder:text-white/60 px-3"
        placeholder="Titulo"
        ref={titleRef}
      />
      <textarea
        className="bg-zinc-900 resize-none p-3 min-h-32 h-auto w-[92.5%] left-1/2 relative -translate-x-1/2 mt-5 border border-solid border-zinc-700 outline-none text-sm text-white placeholder:text-white/60 px-3"
        placeholder="Conteúdo"
        ref={contentRef}
      />

      <button
        onClick={handleCreateTask}
        className="bg-neutral-950 resize-none h-10 w-[92.5%] left-1/2 relative -translate-x-1/2 mt-1 border border-solid border-zinc-700 outline-none text-base font-medium uppercase text-white placeholder:text-white/60 px-3"
      >
        Criar
      </button>
    </div>,
    document.getElementById("modal-portal") as HTMLElement
  );
}
