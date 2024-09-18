const db = require('../../../config/db');

class MetricsRepository {
    static addMetric(userId, metric) {
        return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO metrics (user_id, waterIntake, sleep, mood, date) VALUES (?, ?, ?, ?, DATE('now'))`,
            [userId, metric.waterIntake, metric.sleep, metric.mood],
            function (err) {
            if (err) {
                return reject(err);
            }
            resolve({ id: this.lastID });
            }
        );
        });
    }

    static findMetricsByUserId(userId) {
        return new Promise((resolve, reject) => {
        db.all(
            `SELECT waterIntake, sleep, mood, date FROM metrics WHERE user_id = ?`,
            [userId],
            (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
            }
        );
        });
    }
}

module.exports = MetricsRepository;
