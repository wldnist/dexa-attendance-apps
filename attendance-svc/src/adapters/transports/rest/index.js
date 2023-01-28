import express from "express";
import Repository from "../../datasources/db/mysql/repository.js";
import Service from "../../../core/impl/service.js";
import RouteHandler from "./route_handler.js";
import middleware from "./middleware.js";

const app = express();
const port = 3004;

app.use(express.json());

const repository = new Repository();
const service = new Service(repository);
const routeHandler = new RouteHandler(service);

app.get("/attendances", (...args) => routeHandler.list(...args));
app.get("/attendances/:id", (...args) => routeHandler.get(...args));
app.get("/attendances/current/attendance", (...args) => routeHandler.getCurrentAttendance(...args));
app.post("/attendances", (...args) => routeHandler.upsert(...args));

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`listen from port ${port}`);
});
