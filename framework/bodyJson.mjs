export const bodyJson = (req, res, next) => {
  let body = "";
  req.on("data", (chunk) => {

    body += chunk;
  });

  req.on("end", () => {
    if (body) {
      try {
        req.body = JSON.parse(body);
      } catch (e) {
        req.body = null;
      }
    }
    next();
  });
  req.on("error", () => next());
};
