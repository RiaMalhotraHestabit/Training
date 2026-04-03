import { v4 as uuid } from "uuid";

const tracing = (req, res, next) => {
  const requestId = req.headers["x-request-id"] || uuid();

  req.requestId = requestId;
  res.setHeader("X-Request-ID", requestId);

  next();
};

export default tracing;
