class AppError extends Error {
  constructor(name, message) {
    super(message);

    this.name = name;
  }
}

export const DATA_NOT_FOUND_ERROR_NAME = "DATA_NOT_FOUND";
export const DUPLICATE_DATA_ERROR_NAME = "DUPLICATE_DATA";

export const DataNotFoundError = new AppError(
  DATA_NOT_FOUND_ERROR_NAME,
  "data not found"
);

export const DuplicateDataError = new AppError(
  DUPLICATE_DATA_ERROR_NAME,
  "data is exist"
);

export default AppError;
