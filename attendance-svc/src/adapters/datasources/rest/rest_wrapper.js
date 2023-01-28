import AbstractRestWrapper from "../../../core/ports/rest_wrapper.js";
import axios from "axios";

class RestWrapper extends AbstractRestWrapper {
  constructor(externalServiceUrl) {
    super();

    this.externalServiceUrl = externalServiceUrl;
  }

  async get(params) {
    return await axios
      .get(this.externalServiceUrl, { params: params })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }

  async post(params, data) {
    return await axios
      .post(this.externalServiceUrl, {
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

  async put(params, data) {
    return await axios
      .put(this.externalServiceUrl, {
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

  async delete(params) {
    return await axios
      .delete(this.externalServiceUrl, { params: params })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error;
      });
  }
}

export default RestWrapper;
