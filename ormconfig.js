"use strict";
console.log(process.env.DATABASE_URL)
module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "ssl": { rejectUnauthorized: false },
    "logging": false,
    "entities": [
        process.env.PROD ? "dist/src/models/*.js" : "src/models/*.ts"
    ],
    "migrations": [
        process.env.PROD ? "dist/src/database/migrations/*.js" : "src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "src/database/migrations"
    }
};
