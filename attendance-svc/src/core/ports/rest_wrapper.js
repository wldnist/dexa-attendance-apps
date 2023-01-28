class AbstractRestWrapper {
  constructor() {
    if (this.constructor == AbstractRestWrapper) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async get(params) {
    throw new Error("Method 'get()' must be implemented.");
  }

  async post(params, data) {
    throw new Error("Method 'post()' must be implemented.");
  }

  async put(params, data) {
    throw new Error("Method 'put()' must be implemented.");
  }

  async delete(params) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

export default AbstractRestWrapper;
