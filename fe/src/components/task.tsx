export type TaskProps = {
  title: string;
  id: number;
  content: string;
};

export function Task({
  content,
  id,
  title,
  handleDeleteTask,
}: TaskProps & { handleDeleteTask: (id: number) => Promise<boolean> }) {
  return (
    <div className="w-full h-24 flex justify-between items-center border border-solid border-zinc-700 p-4">
      <div>
        <h1 className="text-white">
          {title} #{id}
        </h1>
        <span className="text-white/65">{content}</span>
      </div>

      <button onClick={() => handleDeleteTask(id)}>
        <TrashSvg />
      </button>
    </div>
  );
}

import type { SVGProps } from "react";

export function TrashSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5rem"
      height="1.5rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fill="#b83232"
          d="M8 21h8a2 2 0 0 0 2-2V7H6v12a2 2 0 0 0 2 2"
          opacity={0.16}
        ></path>
        <path
          stroke="#b83232"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.45}
          d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"
        ></path>
      </g>
    </svg>
  );
}
