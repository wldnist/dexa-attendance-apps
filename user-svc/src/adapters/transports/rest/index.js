import express from "express";
import Repository from "../../datasources/repositories/db/mysql/repository.js";
import Service from "../../../core/impl/service.js";
import RouteHandler from "./route_handler.js";
import middleware from "./middleware.js";

const app = express();
const port = 3003;

app.use(express.json());

const repository = new Repository();
const service = new Service(repository);
const routeHandler = new RouteHandler(service);

app.get("/users", (...args) => routeHandler.list(...args));
app.get("/users/:id", (...args) => routeHandler.get(...args));
app.post("/users", (...args) => routeHandler.create(...args));
app.put("/users/:id", (...args) => routeHandler.update(...args));
app.delete("/users/:id", (...args) => routeHandler.delete(...args));

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`listen from port ${port}`);
});
