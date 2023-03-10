import knex from "knex";
import {
  DataNotFoundError,
  DuplicateDataError,
} from "../../../../../core/ports/error.js";
import AbstractRepository from "../../../../../core/ports/repository.js";
import knexconfig from "./knexfile.js";

class Repository extends AbstractRepository {
  constructor() {
    super();

    const dbClient = knex(knexconfig.development);

    this.dbClient = dbClient;
  }

  async list(data) {
    const queryBuilder = this.dbClient.table("users");
    if (data.username) {
      queryBuilder.where("username", data.username);
    }

    const result = await queryBuilder.select();

    return result;
  }

  async get(id) {
    const result = await this.dbClient.table("users").where("id", id).first();

    return result;
  }

  async create(data) {
    await this.dbClient
      .table("users")
      .insert(data)
      .then(() => null)
      .catch((err) => {
        if (err.code == "3819") {
          throw DuplicateDataError;
        }

        throw err;
      });
  }

  async update(data) {
    const updatedDataCount = await this.dbClient
      .table("users")
      .where("id", data.id)
      .update(data);

    if (updatedDataCount === 0) {
      throw DataNotFoundError;
    }
  }

  async delete(id) {
    const deletedDataCount = await this.dbClient
      .table("users")
      .where("id", id)
      .delete();

    if (deletedDataCount === 0) {
      throw DataNotFoundError;
    }
  }
}

export default Repository;
