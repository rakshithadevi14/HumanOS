const Mood = require('../models/Mood');
const Water = require('../models/Water');
const Activity = require('../models/Activity');
const Sleep = require('../models/Sleep');

async function getInsights(req, res, next) {
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
    // GET USER DATA
    // --------------------------------------------------

    const latestMood = await Mood.findOne({
      userId,
    }).sort({
      recordedAt: -1,
    });

    const waterEntries = await Water.find({
      userId,
      recordedAt: {
        $gte: todayStart,
        $lt: tomorrowStart,
      },
    });

    const activities = await Activity.find({
      userId,
      recordedAt: {
        $gte: todayStart,
        $lt: tomorrowStart,
      },
    });

    const latestSleep = await Sleep.findOne({
      userId,
    }).sort({
      sleepDate: -1,
    });

    // --------------------------------------------------
    // CALCULATE BASIC METRICS
    // --------------------------------------------------

    const totalWaterMl = waterEntries.reduce(
      (total, entry) => total + entry.amountMl,
      0
    );

    const totalActivityMinutes = activities.reduce(
      (total, activity) => total + activity.durationMinutes,
      0
    );

    // --------------------------------------------------
    // CALCULATE WELLNESS SCORE
    // --------------------------------------------------

    const sleepScore = latestSleep
      ? Math.min(
          25,
          (latestSleep.durationMinutes / 480) * 25
        )
      : 0;

    const hydrationScore = Math.min(
      25,
      (totalWaterMl / 2000) * 25
    );

    const activityScore = Math.min(
      25,
      (totalActivityMinutes / 30) * 25
    );

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
    // GENERATE INSIGHTS
    // --------------------------------------------------

    const insights = [];

    // Hydration insight
    if (totalWaterMl < 1000) {
      insights.push({
        type: 'hydration',
        priority: 'high',
        message:
          'Your hydration is currently low. Try drinking more water throughout the day.',
      });
    } else if (totalWaterMl < 2000) {
      insights.push({
        type: 'hydration',
        priority: 'medium',
        message:
          'You are making progress with hydration, but you are still below the daily target.',
      });
    } else {
      insights.push({
        type: 'hydration',
        priority: 'low',
        message:
          'Great job staying hydrated today.',
      });
    }

    // Sleep insight
    if (!latestSleep) {
      insights.push({
        type: 'sleep',
        priority: 'medium',
        message:
          'No recent sleep record was found. Track your sleep to improve your wellness insights.',
      });
    } else if (latestSleep.durationMinutes < 360) {
      insights.push({
        type: 'sleep',
        priority: 'high',
        message:
          'Your recent sleep duration is quite low. Consider giving yourself more time to rest.',
      });
    } else if (latestSleep.durationMinutes < 420) {
      insights.push({
        type: 'sleep',
        priority: 'medium',
        message:
          'Your sleep duration is slightly below the recommended target.',
      });
    } else {
      insights.push({
        type: 'sleep',
        priority: 'low',
        message:
          'Your recent sleep duration looks healthy.',
      });
    }

    // Activity insight
    if (totalActivityMinutes === 0) {
      insights.push({
        type: 'activity',
        priority: 'high',
        message:
          'You have not recorded any activity today. Consider taking a short walk or doing some light movement.',
      });
    } else if (totalActivityMinutes < 30) {
      insights.push({
        type: 'activity',
        priority: 'medium',
        message:
          'You have started moving today. A little more activity could help you reach your daily target.',
      });
    } else {
      insights.push({
        type: 'activity',
        priority: 'low',
        message:
          'Great job reaching your activity target today.',
      });
    }

    // Mood insight
    if (!latestMood) {
      insights.push({
        type: 'mood',
        priority: 'medium',
        message:
          'You have not recorded your mood recently. Check in with yourself to build a better wellness picture.',
      });
    } else if (
      ['sad', 'anxious', 'angry', 'stressed'].includes(
        latestMood.mood.toLowerCase()
      )
    ) {
      insights.push({
        type: 'mood',
        priority: 'high',
        message:
          'Your recent mood suggests you may benefit from some time to rest, reset, or do something that helps you feel better.',
      });
    } else {
      insights.push({
        type: 'mood',
        priority: 'low',
        message:
          'Your recent mood looks positive.',
      });
    }

    // --------------------------------------------------
    // FIND HIGHEST PRIORITY
    // --------------------------------------------------

    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    const highestPriorityInsight = [...insights].sort(
      (a, b) =>
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
    )[0];

    return res.status(200).json({
      success: true,
      data: {
        wellnessScore,
        insights,
        priority: highestPriorityInsight
          ? highestPriorityInsight.type
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getInsights,
};