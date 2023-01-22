import AppError, {
  DATA_NOT_FOUND_ERROR_NAME,
  DUPLICATE_DATA_ERROR_NAME,
} from "../../../core/ports/error.js";

const clientErrorsMapByStatusCode = {
  400: [DUPLICATE_DATA_ERROR_NAME],
  404: [DATA_NOT_FOUND_ERROR_NAME],
};

const errorHandler = (error, req, res, next) => {
  let returnedError = {
    statusCode: 500,
    errorMessage: "Something is wrong",
  };

  if (error instanceof AppError) {
    for (const statusCode in clientErrorsMapByStatusCode) {
      if (clientErrorsMapByStatusCode[statusCode].includes(error.name)) {
        returnedError = {
          statusCode: parseInt(statusCode),
          errorMessage: error.message,
        };

        break;
      }
    }
  }

  if (returnedError.statusCode >= 500) {
    console.log("Server error occured", error);
  }

  res.status(returnedError.statusCode).json({
    error: returnedError.errorMessage,
  });
};

export default {
  errorHandler,
};
