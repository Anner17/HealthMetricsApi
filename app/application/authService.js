const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserRepository = require('../infrastructure/repositories/userRepository');
const User = require('../domain/models/user');
const JWT_SECRET = 'fa828b89a321d2301e7a80c837e627ea5dd993292b083dc623520c4b12ac24c5d8fdb3da90a7a1738de7555b49f9ef35f7484c9a2b6dd56cba34fbb1a0fcab9b';

class AuthService {
    static async register(username, password, email) {
        const existingUser = await UserRepository.findUserByUsernameOrEmail(username, email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(username, hashedPassword, email);
        await UserRepository.addUser(user);
        return 'User registered successfully';
    }

    static async login(email, password) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ username: user.username, id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
}

module.exports = AuthService;
