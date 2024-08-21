import { fastify } from "../server";

class TasksRepositoryClass {
  async index() {
    const [rows] = await fastify.mysql.query("SELECT * FROM tasks", []);
    console.log("aq");

    return rows;
  }

  async find(id: number) {
    const [row] = await fastify.mysql.query(
      "SELECT id, title, content FROM tasks WHERE id=?",
      [id]
    );
    if (!row[0]) {
      return false;
    }

    return row[0];
  }

  async create(title: string, content: string) {
    const [row] = await fastify.mysql.query(
      "INSERT INTO tasks (title, content) VALUES (?, ?)",
      [title, content]
    );

    return row;
  }

  async delete(id: number) {
    const [row] = await fastify.mysql.query("DELETE FROM tasks WHERE id=?", [
      id,
    ]);

    return row;
  }
}

export const TasksRepository = new TasksRepositoryClass();
