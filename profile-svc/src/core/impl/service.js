import { DataNotFoundError, DuplicateDataError } from "../../../../user-svc/src/core/ports/error.js";
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
      // role_id: data.role_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      profile_picture: data.profile_picture,
      created_by: data.user,

      role: data.role,
      username: data.username,
      password: data.password,
    });
  }

  async update(data) {
    const existingData = await this.repository.get(data.id);

    if (!existingData) {
      throw DataNotFoundError;
    }

    if (
      // existingData.role_id == data.role_id &&
      existingData.name == data.name &&
      existingData.email == data.email &&
      existingData.phone == data.phone &&
      existingData.profile_picture == data.profile_picture &&
      existingData.role == data.role &&
      existingData.username == data.username &&
      existingData.password == data.password
    ) {
      return;
    }

    await this.repository.update({
      id: data.id,
      // role_id: data.role_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      profile_picture: data.profile_picture,
      created_by: existingData.created_by,
      updated_by: data.user,

      role: data.role,
      username: data.username,
      password: data.password,
    });
  }

  async delete(id) {
    await this.repository.delete(id);
  }
}

export default Service;
