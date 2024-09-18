const MetricsService = require('../../application/services/metricsService');

class MetricsController {
    static async addMetrics(req, res) {
        try{
            const { waterIntake, sleepHours , mood } = req.body;
            const result = await MetricsService.addMetric(req.user.email, waterIntake, sleepHours, mood);
            res.json(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async getMetrics(req, res) {
        try{
            const userMetrics = await MetricsService.getMetrics(req.user.email);
            res.json(userMetrics);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

module.exports = MetricsController;
