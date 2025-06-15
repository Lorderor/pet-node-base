import http from "http";
import EventEmitter from "events";

export class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      const middlewares = [
        ...this.middlewares,
        (req, res) => {
          this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
        },
      ];
      let idx = 0;
      const next = () => {
        const mw = middlewares[idx++];
        if (mw) mw(req, res, next);
      };
      next();

      res.on("finish", () => {});
    });
  }
  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
