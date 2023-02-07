const knex = require('../config/database');

class User {
    static async getAllUser() {
        return await knex.select().from('o	Users');
    }

    static async getUserById(id) {
        return await knex.from('o	Users').where({ id: id }).first();
    }

    static async getTokenInfoByUserId(userId) {
        return await knex.select().from('Tokens').where({ user_id: userId });
    }

    static async insertUser(user) {
        return await knex('Users').insert(user);
    }
}

module.exports = User;