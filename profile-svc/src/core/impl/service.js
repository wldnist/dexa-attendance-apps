import { DataNotFoundError, DuplicateDataError } from "../../../../user-svc/src/core/ports/error.js";
import AbstractService from "../ports/service.js";
import bcrypt from "bcrypt";

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

    const hashedPassword = this.#hashPassword(data.password);

    await this.repository.create({
      // role_id: data.role_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      profile_picture: data.profile_picture,
      created_by: data.user,

      role: data.role,
      username: data.username,
      password: hashedPassword,
    });
  }

  async update(data) {
    const existingData = await this.repository.get(data.id);

    if (!existingData) {
      throw DataNotFoundError;
    }

    const password = data.password;
    let hashedPassword = "";
    let isPasswordNeverChanged = false;
    if (password == existingData.password) {
      isPasswordNeverChanged = true;
      hashedPassword = password;
    } else {
      hashedPassword = this.#hashPassword(password);
    }

    if (
      // existingData.role_id == data.role_id &&
      existingData.name == data.name &&
      existingData.email == data.email &&
      existingData.phone == data.phone &&
      existingData.profile_picture == data.profile_picture &&
      existingData.role == data.role &&
      existingData.username == data.username &&
      isPasswordNeverChanged
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

  #hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
}

export default Service;
