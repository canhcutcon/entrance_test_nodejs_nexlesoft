const User = require("../model/users.model")
const commonUtil = require("../utils/common.utils")
const MyError = require("../exception/myerror")

const EMAIL_INVALID = "Email Invalid!"
const EMAIL_EXIST_INVALID = "Email already exist!"
const PASSWORD_IVALID = "Password must be between 8-20 characters!"

const authValidate = {

  validEmail: (email) => {
    if (!email) return false

    const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regex.test(String(email).toLowerCase())
  },

  // not empty, minimun 8 - 20
  validatePassword: (password) => {
    if (!password) return false

    if (password.length < 8 || password.length > 20) return false

    return true
  }
}

/**
 *
 * @param {*} param get email, password, firstName, lastName from client
 * @returns
 */
const validateSignUpInfo = async ({ email, password, firstName, lastName }) => {
  const error = {}

  if (!(email && password && firstName && lastName)) { throw new MyError("Missing parameter") }

  // validate email
  if (!authValidate.validEmail(email)) { error.email = EMAIL_INVALID } else if (await User.getUserByEmail(email)) { error.email = EMAIL_EXIST_INVALID }

  // validate password
  if (!authValidate.validatePassword(password)) error.password = PASSWORD_IVALID

  if (!commonUtil.isEmpty(error)) { throw new MyError(error) }

  return { email, password, firstName, lastName }
}

/**
 *
 * @param {*} param0 email, password get from client
 * @returns email, password
 */
const validateSignIn = async ({ email, password }) => {
  if (!(authValidate.validEmail(email)) || !authValidate.validatePassword(password)) { throw new MyError("Login invalid!") }

  return { email, password }
}

module.exports = {
  authValidate,
  validateSignUpInfo,
  validateSignIn
}
