module.exports = function (req, res, next) {
    // Set cache TTL for .js files to 1 year (31536000 seconds)
    if (req.url.endsWith('.js')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  
    // Set cache TTL for .ttf files to 1 month (2592000 seconds)
    if (req.url.endsWith('.ttf')) {
      res.setHeader('Cache-Control', 'public, max-age=2592000');
    }
  
    next();
};
  