class RouteHandler {
  constructor(service) {
    this.service = service;
  }

  list = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      role: req.body.role,
    };

    const roles = await this.service.list(data);

    res.json({
      roles,
    });
  });

  get = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const role = await this.service.get(req.params.id);

    res.json({
      role,
    });
  });

  create = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      role: req.body.role,
      group: req.body.group,
      user: "user",
    };

    await this.service.create(data);

    res.json({
      error: null,
    });
  });

  update = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      id: req.params.id,
      role: req.body.role,
      group: req.body.group,
      user: "user",
    };

    await this.service.update(data);

    res.json({
      error: null,
    });
  });

  delete = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.delete(req.params.id);

    res.json({
      error: null,
    });
  });

  #newHandlerWithExceptionCatcher(handlerFunc) {
    return async (req, res, next) => {
      try {
        await handlerFunc(req, res, next);
      } catch (error) {
        return next(error);
      }
    };
  }
}

export default RouteHandler;
