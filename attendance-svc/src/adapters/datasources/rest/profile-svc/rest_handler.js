import RestWrapper from "../rest_wrapper.js";

class RestHandler {
    constructor() {
      const externalServiceUrl = 'http://localhost:3002/profiles';
      this.restWrapper = new RestWrapper(externalServiceUrl);
    }

    async getProfiles(params) {
      try {
        const path = '/';
        return await this.restWrapper.get(path, params);
      } catch (error) {
        return error;
      }
    }
    
    async getProfileById(id, params) {
      try {
        const path = '/' + id;
        return await this.restWrapper.get(path, params);
      } catch (error) {
        return error;
      }
    }
  }
  
  export default RestHandler;
  