class RouteHandler {
  constructor(service) {
    this.service = service;
  }

  list = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      user_id: req.body.user_id,
    };

    const attendances = await this.service.list(data);

    res.json({
      attendances,
    });
  });

  get = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const attendance = await this.service.get(req.params.id);

    res.json({
      attendance,
    });
  });
  
  getCurrentAttendance = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const attendance = await this.service.getCurrentAttendance(req.body.user_id);

    res.json({
      attendance,
    });
  });

  upsert = this.#newHandlerWithExceptionCatcher(async (req, res) => {
    const data = {
      user_id: req.body.user_id,
      attendance_date: req.body.attendance_date,
      attendance_time: req.body.attendance_time,
    };

    await this.service.upsert(data);

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
