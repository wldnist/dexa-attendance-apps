import express from "express";
import Repository from "../../datasources/db/mysql/repository.js";
import Service from "../../../core/impl/service.js";
import RouteHandler from "./route_handler.js";
import middleware from "./middleware.js";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());

const repository = new Repository();
const service = new Service(repository);
const routeHandler = new RouteHandler(service);

app.use(cors())

app.get("/profiles", (...args) => routeHandler.list(...args));
app.get("/profiles/:id", (...args) => routeHandler.get(...args));
app.post("/profiles", (...args) => routeHandler.create(...args));
app.put("/profiles/:id", (...args) => routeHandler.update(...args));
app.delete("/profiles/:id", (...args) => routeHandler.delete(...args));
app.post("/profiles/login", (...args) => routeHandler.login(...args));

app.use(middleware.errorHandler);

app.listen(port, () => {
  console.log(`listen from port ${port}`);
});
