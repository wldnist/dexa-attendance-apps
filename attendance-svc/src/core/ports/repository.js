class AbstractRepository {
  constructor() {
    if (this.constructor == AbstractRepository) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async list(data) {
    throw new Error("Method 'list()' must be implemented.");
  }

  async get(id) {
    throw new Error("Method 'get()' must be implemented.");
  }

  async getCurrentAttendance(profileId) {
    throw new Error("Method 'getCurrentAttendance()' must be implemented.");
  }

  async create(data) {
    throw new Error("Method 'create()' must be implemented.");
  }

  async update(data) {
    throw new Error("Method 'update()' must be implemented.");
  }
}

export default AbstractRepository;
