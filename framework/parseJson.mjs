export const parseJson = (req, res, next) => {
  res.send = (data) => {
    res.writeHeader(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify(data));
  };
  next();
};
