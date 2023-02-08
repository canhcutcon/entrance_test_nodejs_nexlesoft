const bcrypt = require("bcrypt")
const knex = require("../config/database")
const MyError = require("../exception/myerror")

class User {
    static async getAllUser() {
        return await knex.select().from("Users")
    }

    static async getUserById(id) {
        return await knex.select().from("Users").where({ id }).first()
    }

    static async getUserByEmail(email) {
        return await knex.from("Users").where({ email }).first()
    }

    static async getUserByEmailPassword(email, password) {
        const user = await knex.from("Users").where({ email }).first()

        if (!user) { throw new MyError("User not found!") }

        const isPassMatch = await bcrypt.compare(password, user.password)
        if (!isPassMatch) { throw new MyError("Password is wrong!") }
        return user
    }

    static async getTokenInfoByUserId(userId) {
        return await knex.select().from("Tokens").where({ user_id: userId })
    }

    static async insertUser(user) {
        return await knex("Users").insert(user)
            .then((result) => {
                console.log(`Insert user success ${result}`)
                return result
            })
            .catch((err) => {
                console.log("🚀 ~ file: users.model.js:24 ~ User ~ returnawaitknex ~ err", err)
            })
    }
}

module.exports = User
