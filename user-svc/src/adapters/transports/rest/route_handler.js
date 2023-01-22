class RouteHandler {
  constructor(service) {
    this.service = service;
  }

  list = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      name: req.body.username,
    };

    const users = await this.service.list(data);

    res.json({
      users,
    });
  });

  get = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const user = await this.service.get(req.params.id);

    res.json({
      user,
    });
  });

  create = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      profile_id: req.body.profile_id,
      username: req.body.username,
      password: req.body.password,
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
      profile_id: req.body.profile_id,
      username: req.body.username,
      password: req.body.password,
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
