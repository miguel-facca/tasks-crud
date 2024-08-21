import { useEffect, useState } from "react";
import { http } from "../libs/axios";
import { Modal } from "./modal";
import { SpinLoader } from "./spin-loader";
import { Task, TaskProps } from "./task";

export function List({ filter }: { filter: string }) {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingTasks(true);
      const resp = await http.get("/tasks");

      await new Promise((resolve) => setTimeout(() => resolve(true), 500)); // delay

      setTasks(resp.data);
      setIsLoadingTasks(false);
    })();
  }, []);

  if (isLoadingTasks) {
    return <SpinLoader />;
  }

  const handleDeleteTask = async (id: number) => {
    const resp = await http.delete("tasks", {
      data: {
        id: id,
      },
    });

    if (resp.status !== 200) {
      return false;
    }

    setTasks((prevState) => prevState.filter((task) => task.id !== id));
    return true;
  };

  return (
    <div className="max-w-[40rem] max-h-[77.5vh] w-96 mt-8 overflow-auto">
      {tasks &&
        tasks.length > 0 &&
        tasks
          .filter(
            (task) =>
              String(task.id).includes(filter) ||
              task.content
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase())
          )
          .map((task) => (
            <Task
              key={task.id}
              content={task.content}
              title={task.title}
              id={task.id}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
      <Modal setTasks={setTasks} />
    </div>
  );
}
