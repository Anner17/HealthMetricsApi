const AuthService = require('../../application/authService');

class AuthController {
    static async register(req, res) {
        try {
            const result = await AuthService.register(req.body.username, req.body.password, req.body.email);
            res.status(201).send(result);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await AuthService.login(email, password);
            res.json({ token });
        } catch (error) {
            res.status(401).send(error.message);
        }
    }
}

module.exports = AuthController;
