import knex from "knex";
import {
  DataNotFoundError,
  DuplicateDataError,
} from "../../../../core/ports/error.js";
import AbstractRepository from "../../../../core/ports/repository.js";
import knexconfig from "./knexfile.js";
import Helper from "../../../../core/helpers/helper.js";

class Repository extends AbstractRepository {
  constructor() {
    super();

    const dbClient = knex(knexconfig.development);

    this.dbClient = dbClient;
  }

  async list(data) {
    const queryBuilder = this.dbClient.table("attendances");
    const isValidStartDate = Helper.isValidDate(data.start_date);
    const isValidEndDate = Helper.isValidDate(data.end_date);
    if (isValidStartDate && isValidEndDate) {
      const startDate = Helper.formatDate(data.start_date);
      const endDate = Helper.formatDate(data.end_date);
      queryBuilder.where("attendance_date", ">=", startDate);
      queryBuilder.where("attendance_date", "<=", endDate);
    }

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
    const currentDate = Helper.getCurrentDate();
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
}

export default Repository;
