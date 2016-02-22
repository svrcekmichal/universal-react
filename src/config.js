export default {
  isProduction: process.env.NODE_ENV === 'production',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  hotPort: process.env.PORT ? (parseInt(process.env.PORT, 10) + 1) : 8081,
  tags: {
    title: 'Universal pokec client',
    description: 'Haha raz tu bude cosi sofistikovane',
    head: {
      titleTemplate: 'Pokec: %s',
      meta: [
        { name: 'description', content: 'Haha raz tu bude cosi sofistikovane.' },
        { charset: 'utf-8' },
      ]
    }
  }
};
