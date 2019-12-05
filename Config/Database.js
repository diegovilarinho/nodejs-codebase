const HttpError = require('../Core/Error/HttpError');

class Database {
    constructor(dbName = process.env.DB_NAME) {
        this.dbName = dbName;
        // this.user = 'journey';
        // this.password = 'blabla123';
        this.url = process.env.DB_URL;
        this.client = require('mongodb').MongoClient;
        this.connection = null;
        this.db = null;

        if(process.env.NODE_ENV == 'test') {
            this.dbName = `${this.dbName}-test`;
        }
    }

    async connect() {
        if(this.connection) return this.connection;

        this.connection = await this.client.connect(this.url, { useNewUrlParser: true });
        return this.connection.db(this.dbName);
    }

    async useCollection(collection) {

        if(!this.db) {
            this.db = await this.connect();
        }
        return this.db.collection(collection);
    }

    async getDB() {
        if(!this.db) {
            this.db = await this.connect();
        }
        return this.db;
    }

    createObjectID(hash) {
        try {
            const ObjectId = require('mongodb').ObjectID;
            return new ObjectId(hash);
        }catch(e) {
            throw new HttpError('Invalid ID', 400);
        }
    }
}

module.exports = Database;