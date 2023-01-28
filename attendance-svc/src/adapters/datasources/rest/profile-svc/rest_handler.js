import RestWrapper from "../rest_wrapper.js";

class RestHandler {
    constructor() {
      const externalServiceUrl = 'http://localhost:3002/profiles';
      this.restWrapper = new RestWrapper(externalServiceUrl);
    }

    async getProfiles(params) {
      try {
        return await this.restWrapper.get(params);
      } catch (error) {
        return error;
      }
    }
  }
  
  export default RestHandler;
  