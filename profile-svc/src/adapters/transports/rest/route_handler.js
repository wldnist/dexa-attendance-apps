class RouteHandler {
  constructor(service) {
    this.service = service;
  }

  list = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      name: req.query.name,
      ids: req.query.ids,
    };

    const profiles = await this.service.list(data);

    res.json({
      profiles,
    });
  });

  get = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const profile = await this.service.get(req.params.id);

    res.json({
      profile,
    });
  });

  create = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      // role_id: req.body.role_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profile_picture: req.body.profile_picture,
      user: "user",

      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    };

    await this.service.create(data);

    res.json({
      error: null,
    });
  });

  update = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      id: req.params.id,
      // role_id: req.body.role_id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profile_picture: req.body.profile_picture,
      user: "user",

      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
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

  login = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };

    const profile = await this.service.login(data);

    res.json({
      profile,
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
