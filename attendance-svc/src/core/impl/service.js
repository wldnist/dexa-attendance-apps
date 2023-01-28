import AbstractService from "../ports/service.js";
import ProfileSvcRestHandler from "../../adapters/datasources/rest/profile-svc/rest_handler.js";

class Service extends AbstractService {
  constructor(repository) {
    super();

    this.repository = repository;
    this.profileSvcRestHandler = new ProfileSvcRestHandler();
  }

  async list(data) {
    const listAttendance = await this.repository.list(data);
    if (listAttendance.length < 1) {
      return listAttendance;
    }

    let profileIds = [];
    listAttendance.forEach(function (attendance) {
      profileIds.push(attendance.profile_id);
    });
    
    const params = {
      ids: [...new Set(profileIds)]
    };
    
    let listProfile = [];
    let restructuredListProfile = [];
    try {
      const profiles = await this.profileSvcRestHandler.getProfiles(params);
      listProfile = profiles.data.profiles;
      listProfile.forEach(function (profile) {
        return restructuredListProfile[profile.id] = profile;
      });
    } catch (error) {
      return listAttendance;
    }

    return listAttendance.map((attendance) => ({
      ...attendance,
      attendance_date: this.#formatDate(attendance.attendance_date),
      profile: restructuredListProfile[attendance.profile_id],
    }));
  }

  async get(id) {
    const attendance = await this.repository.get(id);
    if (!attendance) {
      return attendance;
    }

    let profile = {};
    try {
      const getProfileByIdRes = await this.profileSvcRestHandler.getProfileById(attendance.profile_id, {});
      profile = getProfileByIdRes.data.profile;
    } catch (error) {
      return attendance;
    }

    return {
      ...attendance,
      profile: profile,
    };
  }

  async getCurrentAttendance(profileId) {
    const attendance = await this.repository.getCurrentAttendance(profileId);
    if (!attendance) {
      return attendance;
    }

    let profile = {};
    try {
      const getProfileByIdRes = await this.profileSvcRestHandler.getProfileById(attendance.profile_id, {});
      profile = getProfileByIdRes.data.profile;
    } catch (error) {
      return attendance;
    }

    return {
      ...attendance,
      profile: profile,
    };
  }

  async upsert(data) {
    const existingData = await this.repository.getCurrentAttendance(data.profile_id);

    if (!existingData) {
      await this.repository.create({
        profile_id: data.profile_id,
        attendance_date: data.attendance_date,
        attendance_in: data.attendance_time,
      });
    } else {
      await this.repository.update({
        id: existingData.id,
        profile_id: existingData.profile_id,
        attendance_date: existingData.attendance_date,
        attendance_in: existingData.attendance_in,
        attendance_out: data.attendance_time,
      });
    }
  }

  #formatDate(d) {
    const currentDate = new Date(d);

    let date = ("0" + currentDate.getDate()).slice(-2);
    let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let year = currentDate.getFullYear();

    return `${year}-${month}-${date}`;
  }
}

export default Service;
