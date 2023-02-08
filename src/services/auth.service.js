const User = require('../model/users.model');
const commonUtil = require('../utils/common.utils');
const { validateSignUpInfo } = require('../validation/auth.validation');

class AuthService {
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
    async signUp(userInfo) {
        const { email, password, firstName, lastName } = await validateSignUpInfo(userInfo);

        const user = {
            firstName,
            lastName,
            email,
            password: await commonUtil.hashPassword(password)
        };

        const userId = await User.insertUser(user);

        return {
            id: userId[0],
            firstName,
            lastName,
            email,
            displayName: `${firstName} ${lastName}`
        };
    }

    async signIn(userInfo) {
        const { email, password } = await si;



    }
}

module.exports = new AuthService();
