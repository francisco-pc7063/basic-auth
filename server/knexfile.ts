const path = require('path')

require('dotenv').config()

const { NODE_ENV, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB }  = process.env

if(NODE_ENV === 'test') undefined
else console.log("[DATABASE]: Initializing database connections on ENV:", NODE_ENV)

var pg
if (process.env.DB_HOST === 'production'){
    pg = {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
}
else if (process.env.POSTGRES_HOST === 'test'){
    pg = {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER || 'homologation',
            password: process.env.POSTGRES_PASSWORD || 'homologation',
            database: process.env.POSTGRES_DB || 'hmo'
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
}
else {
    pg = {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: 'development',
            password: 'development',
            database: 'dev'
        },
        migrations: {
            directory: path.resolve(__dirname, 'src', 'database', 'migrations')
        },
        seeds: {
            directory: path.resolve(__dirname, 'src', 'database', 'seeds')
        }
    }
}

module.exports = pg