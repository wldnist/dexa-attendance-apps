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

  async getCurrentAttendance(userId) {
    return this.repository.getCurrentAttendance(userId);
  }

  async upsert(data) {
    const existingData = await this.repository.getCurrentAttendance(data.user_id);

    if (!existingData) {
      await this.repository.create({
        user_id: data.user_id,
        attendance_date: data.attendance_date,
        attendance_in: data.attendance_time,
      });
    } else {
      await this.repository.update({
        id: existingData.id,
        user_id: existingData.user_id,
        attendance_date: existingData.attendance_date,
        attendance_in: existingData.attendance_in,
        attendance_out: data.attendance_time,
      });
    }
  }
}

export default Service;
