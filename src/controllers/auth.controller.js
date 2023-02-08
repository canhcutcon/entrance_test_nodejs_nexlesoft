const authService = require('../services/auth.service');

class AuthController {
    // [POST]/auth/sign-up
    async signUp(req, res, next) {
        const { email, password, firstName, lastName } = req.body;

        try {
            const data = await authService.signUp({ email, password, firstName, lastName });

            return res.status(201).json({ data }

            );
        } catch (error) {
            next(error);
        }
    }

    // [POST] /auth/sign-in
    async signIn(req, res, next) {
        try {
            const data = await authService.signIn(req.body);
            console.log("🚀 ~ file: auth.controller.js:23 ~ AuthController ~ signIn ~ data", data)

            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    // [POST] /auth/refresh-token
    async refreshToken(req, res, next) {
        const { refreshToken } = req.body;
        try {
            const data = await authService.refreshToken(refreshToken);

            return res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    async signOut(req, res, next) {
        const { userId } = req.auth;

        try {
            await authService.signOut(userId);

            return res.status(204).json({});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();