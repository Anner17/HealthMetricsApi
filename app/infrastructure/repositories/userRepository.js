const db = require('../../../config/db');

class UserRepository {
    static findUserByUsernameOrEmail(username, email) {
        return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE username = ? || email = ?`, [username, email], (err, row) => {
            if (err) {
            return reject(err);
            }
            resolve(row);
        });
        });
    }

    static findUserByEmail(email) {
        return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) {
            return reject(err);
            }
            resolve(row);
        });
        });
    }

    static addUser(user) {
        return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
            [user.username, user.password, user.email],
            function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID });
            }
        );
        });
    }
}

module.exports = UserRepository;
