const knex = require('../config/database');

class User {
    static async getAllUser() {
        return await knex.select().from('Users');
    }

    static async getUserById(id) {
        return await knex.from('Users').where({ id: id }).first();
    }

    static async getUserByEmail(email) {
        return await knex.from('Users').where({ email: email }).first();
    }

    static async getTokenInfoByUserId(userId) {
        return await knex.select().from('Tokens').where({ user_id: userId });
    }

    static async insertUser(user) {
        return await knex('Users').insert(user)
            .then((result) => {
                console.log(`Insert user success ${result}`);
                return result;
            })
            .catch((err) => {
                console.log("🚀 ~ file: users.model.js:24 ~ User ~ returnawaitknex ~ err", err)
            })
            .finally(() => {
                knex.destroy();
            });
    }

}

module.exports = User;