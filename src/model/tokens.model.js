const knex = require('../config/database');

class Token {
    static async getAllToken() {
        return await knex.select().from('Tokens');
    }
    static async createToken(token) {
        return await knex('Tokens').insert(token)
            .then((result) => {
                console.log(`Insert token success ${result}`);
                return result;
            })
            .catch((err) => {
                console.log("🚀 ~ file: tokens.model.js:20 ~ Token ~ err", err)
            })
    }

    static async getRefreshToken(refreshToken) {
        return await knex.select().from('Tokens').where({ refreshToken }).first();
    }

    static async deleteRefreshTokenByUser(userId) {
        return await knex.select().from('Tokens').where({ userId: userId }).del()
            .then(() => {
                console.log('deleted successfully');
            })
            .catch((err) => {
                console.error('Error deleting:', err);
            });;
    }

    static async deleteRefreshToken(refreshToken) {
        return await knex.select().from('Tokens').where({ refreshToken: refreshToken }).del()
            .then(() => {
                console.log('deleted successfully');
            })
            .catch((err) => {
                console.error('Error deleting:', err);
            });
    }
}

module.exports = Token;