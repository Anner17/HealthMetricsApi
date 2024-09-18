class FeedbackLogic {
    static getFeedback(sleep, mood) {
        if (sleep < 6) {
            return "Consider getting more rest.";
        }
        if (mood === "Stressed") {
            return "Try relaxation techniques.";
        }
        return "Keep up the good work!";
    }
}

module.exports = FeedbackLogic;