import AbstractRestWrapper from "../../../core/ports/rest_wrapper.js";
import axios from "axios";

class RestWrapper extends AbstractRestWrapper {
  constructor(externalServiceUrl) {
    super();

    this.externalServiceUrl = externalServiceUrl;
  }

  async get(path, params) {
    return await axios
      .get(this.externalServiceUrl + path, { params: params })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async post(path, params, data) {
    return await axios
      .post(this.externalServiceUrl + path, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
        data: data,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async put(path, params, data) {
    return await axios
      .put(this.externalServiceUrl + path, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
        data: data,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async delete(path, params) {
    return await axios
      .delete(this.externalServiceUrl + path, { params: params })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
}

export default RestWrapper;
