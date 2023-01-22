import {
  DataNotFoundError,
  DuplicateDataError,
} from "../../../../user-svc/src/core/ports/error.js";
import AbstractService from "../ports/service.js";

class Service extends AbstractService {
  constructor(repository) {
    super();

    this.repository = repository;
  }

  async list(data) {
    return this.repository.list(data);
  }

  async get(id) {
    return this.repository.get(id);
  }

  async create(data) {
    const existingData = await this.repository.list(data);

    if (existingData.length > 0) {
      throw DuplicateDataError;
    }

    await this.repository.create({
      role: data.role,
      group: data.group,
      created_by: data.user,
    });
  }

  async update(data) {
    const existingData = await this.repository.get(data.id);

    if (!existingData) {
      throw DataNotFoundError;
    }

    if (existingData.role == data.role && existingData.group == data.group) {
      return;
    }

    await this.repository.update({
      id: data.id,
      role: data.role,
      group: data.group,
      created_by: existingData.created_by,
      updated_by: data.user,
    });
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}

export default Service;
