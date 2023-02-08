const dotenv = require("dotenv")
const MyError = require("../exception/myerror")
const User = require("../model/users.model")
const Token = require("../model/tokens.model")
const commonUtil = require("../utils/common.utils")
const tokenUtils = require("../utils/token.utils")
const { validateSignUpInfo, validateSignIn } = require("../validation/auth.validation")
const NotFoundError = require("../exception/notfound")

class AuthService {
  /**
     *
     * @param {*} userId get userId to generate token and refresh token
     * @returns token, refreshToken
     */
  async generateAndUpdateAccessTokenAndRefreshToken (userId) {
    const accessToken = await tokenUtils.generateToken(
      { userId },
      process.env.JWT_LIFE_ACCESS_TOKEN
    )

    const refreshToken = await tokenUtils.generateToken(
      { userId },
      process.env.JWT_LIFE_REFRESH_TOKEN
    )

    const token = {
      userId,
      refreshToken,
      expiresIn: process.env.JWT_LIFE_REFRESH_TOKEN,
      updatedAt: new Date(),
      createdAt: new Date()
    }

    await Token.createToken(token)

    return {
      token: accessToken,
      refreshToken
    }
  }

  /**
     *
     * @param {*} userInfo get email pass, firstName, lastName
     * @returns {
            id: userId,
            firstName,
            lastName,
            email,
            displayName: `${firstName} ${lastName}`
        };
     */
  async signUp (userInfo) {
    const { email, password, firstName, lastName } = await validateSignUpInfo(userInfo)

    const user = {
      firstName,
      lastName,
      email,
      password: await commonUtil.hashPassword(password)
    }

    const userId = await User.insertUser(user)

    return {
      id: userId[0],
      firstName,
      lastName,
      email,
      displayName: `${firstName} ${lastName}`
    }
  }

  async signIn (userInfo) {
    const { email, password } = await validateSignIn(userInfo)

    const user = await User.getUserByEmailPassword(email, password)

    if (!user) { throw new MyError("SignIn invalid!") }

    const { id, firstName, lastName } = user
    const { token, refreshToken } = await this.generateAndUpdateAccessTokenAndRefreshToken(id)

    return {
      user: {
        firstName,
        lastName,
        email,
        displayName: `${firstName} ${lastName}`
      },
      token,
      refreshToken
    }
  }

  async refreshToken (refreshToken) {
    // validate token
    if (!refreshToken) { throw new MyError("Missing parameter!") }

    const reToken = await Token.getRefreshToken(refreshToken)
    console.log("🚀 ~ file: auth.service.js:105 ~ AuthService ~ refreshToken ~ reToken", reToken)

    if (!reToken) { throw new NotFoundError("Refresh token does not exist!") }

    const { userId } = await tokenUtils.verifyToken(refreshToken)

    const user = await User.getUserById(userId)

    if (!user) { throw new MyError("User not found!") }

    await Token.deleteRefreshToken(refreshToken)

    return await this.generateAndUpdateAccessTokenAndRefreshToken(userId)
  }

  async signOut (userId) {
    if (!userId) { throw new MyError("Missing parameter!") }

    await Token.deleteRefreshTokenByUser(userId)
  }
}

module.exports = new AuthService()
