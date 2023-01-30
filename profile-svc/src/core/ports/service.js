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

  async create(data) {
    throw new Error("Method 'create()' must be implemented.");
  }

  async update(data) {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete(id) {
    throw new Error("Method 'delete()' must be implemented.");
  }

  async login(data) {
    throw new Error("Method 'login()' must be implemented.");
  }
}

export default AbstractService;
