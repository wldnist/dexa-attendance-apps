class AbstractService {
  constructor() {
    if (this.constructor == AbstractService) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async list(data) {
    throw new Error("Method 'list()' must be implemented.");
  }

  async get(id) {
    throw new Error("Method 'get()' must be implemented.");
  }
  
  async getCurrentAttendance(userId) {
    throw new Error("Method 'getCurrentAttendance()' must be implemented.");
  }

  async upsert(data) {
    throw new Error("Method 'upsert()' must be implemented.");
  }
}

export default AbstractService;
