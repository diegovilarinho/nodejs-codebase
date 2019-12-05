const Database = require('../../Config/Database');
const ObjectID = require('mongodb').ObjectID;
//const MessageBroker = require('../../Core/Broker');

class UserRepository extends Database {
    constructor() {
        super();
        this.collection = 'users';
    }

    async create(user) {
        const collection = await super.useCollection(this.collection);
        // new MessageBroker('log').send('info', 'user.create', user);
        const result = await collection.insertOne(user);
        return result.insertedCount == 1 ? result.insertedId : false;
    }

    async update(id, user) {
        const collection = await super.useCollection(this.collection);
        // new MessageBroker('log').send('info', 'user.update', user);
        const result = await collection.updateOne({_id: id}, {$set: user});
        return result.matchedCount == 1 ? true : false;
    }

    async delete(id) {
        const collection = await getCollection();
        return await collection.deleteOne({_id: id});
    }

    async findOne(filterObj) {
        const collection = await super.useCollection(this.collection);
        const user = await collection.findOne(filterObj);
        return user;
    }

    async find(filters) {
        let match = {};
        if(filters.email) {
            // Busca usuários que tenham email ou algum secondaryEmail 
            // iguais ao enviado na query string
            match.$or = [
                { email: filters.email },
                { secondaryEmails: filters.email },
            ];
            delete filters.email;
        }
        if(filters.roles) {
            // Busca usuários que tenham, dentre as roles atribuídas a ele,
            // a role enviada na requisição
            match.roles = { $in: [filters.roles] }
            delete filters.roles
        }
        // Faz o merge do object de match com os filtros restantes
        match = Object.assign(match, filters);

        const collection = await super.useCollection(this.collection);
        return collection.aggregate([{ $match: match }]).toArray();
    }
}

module.exports = new UserRepository;