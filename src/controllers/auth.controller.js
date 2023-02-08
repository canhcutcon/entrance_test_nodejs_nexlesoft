const authService = require('../services/auth.service');

class AuthController {
    // [POST] /sigup
    async signUp(req, res, next) {
        const { email, password, firstName, lastName } = req.body;

        try {
            const data = await authService.signUp({ email, password, firstName, lastName });

            return res.status(201).json([
                data
            ]);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AuthController();