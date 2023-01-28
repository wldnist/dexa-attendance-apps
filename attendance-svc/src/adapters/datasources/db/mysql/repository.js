import knex from "knex";
import {
  DataNotFoundError,
  DuplicateDataError,
} from "../../../../core/ports/error.js";
import AbstractRepository from "../../../../core/ports/repository.js";
import knexconfig from "./knexfile.js";

class Repository extends AbstractRepository {
  constructor() {
    super();

    const dbClient = knex(knexconfig.development);

    this.dbClient = dbClient;
  }

  async list(data) {
    const currentDate = this.#getCurrentDate();
    let startDate = data.start_date;
    let endDate = data.end_date;
    if (!startDate) {
      startDate = currentDate;
    }

    if (!endDate) {
      endDate = currentDate;
    }

    const queryBuilder = this.dbClient
      .table("attendances")
      .where("attendance_date", ">=", startDate)
      .where("attendance_date", "<=", endDate);

    if (data?.profile_id) {
      queryBuilder.where("profile_id", data.profile_id);
    }

    const result = await queryBuilder.select();

    return result;
  }

  async get(id) {
    const result = await this.dbClient
      .table("attendances")
      .where("id", id)
      .first();

    return result;
  }

  async getCurrentAttendance(profileId) {
    const currentDate = this.#getCurrentDate();
    const result = await this.dbClient
      .table("attendances")
      .where("profile_id", profileId)
      .where("attendance_date", currentDate)
      .first();

    return result;
  }

  async create(data) {
    await this.dbClient
      .table("attendances")
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
      .table("attendances")
      .where("id", data.id)
      .update(data);

    if (updatedDataCount === 0) {
      throw DataNotFoundError;
    }
  }

  #getCurrentDate() {
    const currentDate = new Date();

    let date = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();

    return `${year}-${month}-${date}`;
  }
}

export default Repository;
