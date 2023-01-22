import AbstractService from "../ports/service.js";
import bcrypt from "bcrypt";
import { DataNotFoundError, DuplicateDataError } from "../ports/error.js";

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
      profile_id: data.profile_id,
      username: data.username,
      password: hashedPassword,
      created_by: data.user,
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
      existingData.profile_id == data.profile_id &&
      existingData.username == data.username &&
      isPasswordNeverChanged
    ) {
      return;
    }
    
    await this.repository.update({
      id: data.id,
      profile_id: data.profile_id,
      username: data.username,
      password: hashedPassword,
      created_by: existingData.created_by,
      updated_by: data.user,
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
