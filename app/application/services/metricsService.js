const MetricsRepository = require('../../infrastructure/repositories/metricsRepository');
const Metric = require('../../domain/models/metric');
const FeedbackLogic = require('../../domain/feedbackLogic');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class MetricsService {
    static async addMetric(email, waterIntake, sleep, mood) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const metric = new Metric(waterIntake, sleep, mood);
        await MetricsRepository.addMetric(user.id, metric);

        const feedback = FeedbackLogic.getFeedback(sleep, mood);
        return { message: 'Metrics saved', feedback };
    }

    static async getMetrics(email) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const userMetrics = await MetricsRepository.findMetricsByUserId(user.id);
        return userMetrics;
    }
}

module.exports = MetricsService;
