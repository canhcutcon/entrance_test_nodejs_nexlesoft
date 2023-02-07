const knex = require('../config/database');

class Token {
    static async getAllToken() {
        return await knex.select().from('users');
    }

    static async getUserById(id) {
        return await knex.from('users').where({ id: id }).first();
    }

}