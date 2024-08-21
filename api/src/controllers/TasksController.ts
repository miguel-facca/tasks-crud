import { TasksRepository } from "../repositories/TasksRepository";

class TasksControllerClass {
  async index() {
    return await TasksRepository.index();
  }

  async find(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.send({
        status: 422,
      });
    }

    const data = await TasksRepository.find(id);

    if (!data) {
      return response.send({
        status: 404,
      });
    }

    return data;
  }

  async create(request, response) {
    const { title, content } = request.body;

    if (!title) {
      return response.send({
        status: 422,
        message: "Missing title",
      });
    }

    if (!content) {
      return response.send({
        status: 422,
        message: "Missing content",
      });
    }

    const data = await TasksRepository.create(title, content);

    if (!data) {
      return response.send({ status: 400 });
    }

    return await response.send({ status: 201, id: data.insertId });
  }

  async delete(request, response) {
    const { id } = request.body;
    console.log({ request });

    if (!id) {
      return response.send({
        status: 422,
      });
    }

    if (!(await TasksRepository.delete(id)))
      return response.send({ status: 404 });

    return response.send({ status: 200 });
  }
}

export const TasksController = new TasksControllerClass();
