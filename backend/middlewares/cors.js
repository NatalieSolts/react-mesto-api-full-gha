const allowedCors = [
  'https://nata.nomoredomains.rocks',
  'http://nata.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию
// (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
