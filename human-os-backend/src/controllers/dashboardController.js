const Mood = require('../models/Mood');
const Water = require('../models/Water');
const Activity = require('../models/Activity');
const Sleep = require('../models/Sleep');

async function getDashboard(req, res, next) {
  try {
    const userId = req.user.userId;

    // --------------------------------------------------
    // DATE RANGE FOR TODAY
    // --------------------------------------------------

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    // --------------------------------------------------
    // LATEST MOOD
    // --------------------------------------------------

    const latestMood = await Mood.findOne({
      userId,
    }).sort({
      recordedAt: -1,
    });

    // --------------------------------------------------
    // TODAY'S WATER
    // --------------------------------------------------

    const waterEntries = await Water.find({
      userId,
      recordedAt: {
        $gte: todayStart,
        $lt: tomorrowStart,
      },
    });

    const totalWaterMl = waterEntries.reduce(
      (total, entry) => total + entry.amountMl,
      0
    );

    // --------------------------------------------------
    // TODAY'S ACTIVITY
    // --------------------------------------------------

    const activities = await Activity.find({
      userId,
      recordedAt: {
        $gte: todayStart,
        $lt: tomorrowStart,
      },
    });

    const totalActivityMinutes = activities.reduce(
      (total, activity) => total + activity.durationMinutes,
      0
    );

    const totalCalories = activities.reduce(
      (total, activity) => total + activity.calories,
      0
    );

    // --------------------------------------------------
    // LATEST SLEEP
    // --------------------------------------------------

    const latestSleep = await Sleep.findOne({
      userId,
    }).sort({
      sleepDate: -1,
    });

    // --------------------------------------------------
    // WELLNESS SCORE
    // --------------------------------------------------

    // Sleep score: 25 points maximum.
    // 8 hours or more = full score.
    const sleepScore = latestSleep
      ? Math.min(
          25,
          (latestSleep.durationMinutes / 480) * 25
        )
      : 0;

    // Hydration score: 25 points maximum.
    // 2000 ml is used as the daily target.
    const hydrationScore = Math.min(
      25,
      (totalWaterMl / 2000) * 25
    );

    // Activity score: 25 points maximum.
    // 30 minutes is used as the daily target.
    const activityScore = Math.min(
      25,
      (totalActivityMinutes / 30) * 25
    );

    // Mood score: 25 points maximum.
    const moodScores = {
      happy: 25,
      excited: 25,
      calm: 20,
      neutral: 15,
      sad: 10,
      anxious: 10,
      angry: 5,
      stressed: 5,
    };

    const moodScore = latestMood
      ? moodScores[latestMood.mood.toLowerCase()] || 15
      : 0;

    const wellnessScore = Math.round(
      sleepScore +
        hydrationScore +
        activityScore +
        moodScore
    );

    // --------------------------------------------------
    // RETURN DASHBOARD
    // --------------------------------------------------

    return res.status(200).json({
      success: true,
      data: {
        dashboard: {
          wellnessScore,

          wellnessBreakdown: {
            sleep: Math.round(sleepScore),
            hydration: Math.round(hydrationScore),
            activity: Math.round(activityScore),
            mood: Math.round(moodScore),
          },

          mood: latestMood,

          water: {
            totalMl: totalWaterMl,
            entries: waterEntries,
          },

          activity: {
            totalMinutes: totalActivityMinutes,
            totalCalories,
            entries: activities,
          },

          sleep: latestSleep,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboard,
};