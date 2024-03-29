module.exports = {
  "development": {
    "username": process.env.DEV_DB_USERNAME,
    "password": process.env.DEV_DB_PASSWORD,
    "database": process.env.DEV_DB_DATABASE,
    "host": process.env.DEV_DB_HOST,
    "dialect": process.env.DEV_DB_DIALECT
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": process.env.DEV_DB_DIALECT
  },
  "production": {
    "use_env_variable": 'DATABASE_URL',
    "dialect": 'postgres',
    "protocol": 'postgres',
    "ssl": true,
    "dialectOptions": {
      "ssl": {
       "require": true,
       "rejectUnauthorized": false,
      },
    },
   }
}
