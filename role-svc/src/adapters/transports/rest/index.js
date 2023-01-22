import express from "express";
import Repository from "../../datasources/repositories/db/mysql/repository.js";
import Service from "../../../core/impl/service.js";
import RouteHandler from "./route_handler.js";
import middleware from "./middleware.js";

const app = express();
const port = 3001;

app.use(express.json());

const repository = new Repository();
const service = new Service(repository);
const routeHandler = new RouteHandler(service);

app.get("/roles", (...args) => routeHandler.list(...args));
app.get("/roles/:id", (...args) => routeHandler.get(...args));
app.post("/roles", (...args) => routeHandler.create(...args));
app.put("/roles/:id", (...args) => routeHandler.update(...args));
app.delete("/roles/:id", (...args) => routeHandler.delete(...args));

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`listen from port ${port}`);
});
