export default {
  isProduction: process.env.NODE_ENV === 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  hotPort: process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 8081
};
