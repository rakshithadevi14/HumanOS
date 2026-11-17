import { useState, useEffect } from "react";
import GetStarted from "./GetStarted";
import LoginPage from "./LoginPage";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const MOOD_LIST = [
    { id: "angry", emoji: "😠", label: "Angry", col: "#EF4444" },
    { id: "sad", emoji: "😢", label: "Sad", col: "#3B82F6" },
    { id: "meh", emoji: "😐", label: "Meh", col: "#F59E0B" },
    { id: "calm", emoji: "😌", label: "Calm", col: "#10B981" },
    { id: "happy", emoji: "😊", label: "Happy", col: "#8B5CF6" },
];

const MOOD_DATA = {
    angry: {
        foods: ["Chamomile tea", "Dark chocolate", "Blueberries"],
        activities: ["Walk 20 min", "Deep breathing", "Yoga"],
        tip: "Take 5 deep breaths before reacting.",
    },

    sad: {
        foods: ["Banana", "Walnuts", "Dark chocolate"],
        activities: ["Light jog", "Call a friend", "Journal"],
        tip: "Small wins matter. Start with one task.",
    },

    meh: {
        foods: ["Green tea", "Almonds", "Oats"],
        activities: ["Stretch 10 min", "Short walk", "Music"],
        tip: "Change your environment to reset your mood.",
    },

    calm: {
        foods: ["Salad", "Fruit bowl", "Herbal tea"],
        activities: ["Meditation", "Reading", "Yoga"],
        tip: "Maintain this peace with 10 min meditation.",
    },

    happy: {
        foods: ["Smoothie", "Fresh fruits", "Nuts"],
        activities: ["Dance", "Run", "Workout"],
        tip: "Channel this energy into something creative!",
    },
};

const DIET = {
    loss: {
        veg: {
            Breakfast: [
                {
                    name: "Oats Porridge",
                    cal: 180,
                    pro: 6,
                    carb: 32,
                    fat: 3,
                    type: "veg",
                },
                {
                    name: "Fruit Bowl",
                    cal: 120,
                    pro: 2,
                    carb: 28,
                    fat: 1,
                    type: "veg",
                },
            ],

            Lunch: [
                {
                    name: "Dal & Brown Rice",
                    cal: 320,
                    pro: 14,
                    carb: 52,
                    fat: 5,
                    type: "veg",
                },
                {
                    name: "Veg Salad",
                    cal: 80,
                    pro: 3,
                    carb: 12,
                    fat: 2,
                    type: "veg",
                },
            ],

            Snacks: [
                {
                    name: "Green Tea + Almonds",
                    cal: 90,
                    pro: 3,
                    carb: 4,
                    fat: 7,
                    type: "veg",
                },
            ],

            Dinner: [
                {
                    name: "Palak Paneer (small)",
                    cal: 260,
                    pro: 12,
                    carb: 18,
                    fat: 14,
                    type: "veg",
                },
                {
                    name: "1 Roti",
                    cal: 80,
                    pro: 3,
                    carb: 16,
                    fat: 1,
                    type: "veg",
                },
            ],
        },

        nonveg: {
            Breakfast: [
                {
                    name: "Egg White Omelette",
                    cal: 120,
                    pro: 16,
                    carb: 2,
                    fat: 3,
                    type: "nonveg",
                },
                {
                    name: "Brown Bread",
                    cal: 80,
                    pro: 3,
                    carb: 15,
                    fat: 1,
                    type: "nonveg",
                },
            ],

            Lunch: [
                {
                    name: "Grilled Chicken",
                    cal: 280,
                    pro: 32,
                    carb: 8,
                    fat: 9,
                    type: "nonveg",
                },
                {
                    name: "Salad",
                    cal: 60,
                    pro: 2,
                    carb: 10,
                    fat: 1,
                    type: "nonveg",
                },
            ],

            Snacks: [
                {
                    name: "Boiled Egg",
                    cal: 70,
                    pro: 6,
                    carb: 0,
                    fat: 5,
                    type: "nonveg",
                },
            ],

            Dinner: [
                {
                    name: "Fish Curry (light)",
                    cal: 240,
                    pro: 28,
                    carb: 10,
                    fat: 8,
                    type: "nonveg",
                },
                {
                    name: "Brown Rice (small)",
                    cal: 150,
                    pro: 3,
                    carb: 32,
                    fat: 1,
                    type: "nonveg",
                },
            ],
        },
    },

    gain: {
        veg: {
            Breakfast: [
                {
                    name: "Banana Peanut Smoothie",
                    cal: 380,
                    pro: 12,
                    carb: 52,
                    fat: 14,
                    type: "veg",
                },
                {
                    name: "Paneer Toast",
                    cal: 280,
                    pro: 14,
                    carb: 28,
                    fat: 12,
                    type: "veg",
                },
            ],

            Lunch: [
                {
                    name: "Rajma Rice",
                    cal: 480,
                    pro: 18,
                    carb: 72,
                    fat: 10,
                    type: "veg",
                },
                {
                    name: "Curd",
                    cal: 80,
                    pro: 4,
                    carb: 8,
                    fat: 3,
                    type: "veg",
                },
            ],

            Snacks: [
                {
                    name: "Dry Fruits Mix",
                    cal: 220,
                    pro: 5,
                    carb: 18,
                    fat: 14,
                    type: "veg",
                },
            ],

            Dinner: [
                {
                    name: "Paneer Butter Masala",
                    cal: 420,
                    pro: 18,
                    carb: 28,
                    fat: 24,
                    type: "veg",
                },
                {
                    name: "2 Rotis",
                    cal: 160,
                    pro: 6,
                    carb: 32,
                    fat: 2,
                    type: "veg",
                },
            ],
        },

        nonveg: {
            Breakfast: [
                {
                    name: "Egg Bhurji (3 eggs)",
                    cal: 280,
                    pro: 20,
                    carb: 6,
                    fat: 18,
                    type: "nonveg",
                },
                {
                    name: "Milk + Banana",
                    cal: 220,
                    pro: 8,
                    carb: 38,
                    fat: 4,
                    type: "nonveg",
                },
            ],

            Lunch: [
                {
                    name: "Chicken Biryani",
                    cal: 520,
                    pro: 32,
                    carb: 62,
                    fat: 14,
                    type: "nonveg",
                },
                {
                    name: "Raita",
                    cal: 60,
                    pro: 3,
                    carb: 6,
                    fat: 2,
                    type: "nonveg",
                },
            ],

            Snacks: [
                {
                    name: "Tuna Sandwich",
                    cal: 280,
                    pro: 22,
                    carb: 28,
                    fat: 8,
                    type: "nonveg",
                },
            ],

            Dinner: [
                {
                    name: "Mutton Curry",
                    cal: 380,
                    pro: 28,
                    carb: 12,
                    fat: 22,
                    type: "nonveg",
                },
                {
                    name: "Rice",
                    cal: 200,
                    pro: 4,
                    carb: 44,
                    fat: 1,
                    type: "nonveg",
                },
            ],
        },
    },
};

const WEATHER_DATA = [
    {
        type: "sunny",
        icon: "☀️",
        label: "Sunny & Hot",
        temp: "30-40°C",
        items: [
            {
                icon: "👕",
                name: "Light Cotton Tee",
                desc: "Breathable fabric",
            },
            {
                icon: "🩳",
                name: "Shorts",
                desc: "Stay cool",
            },
            {
                icon: "🕶️",
                name: "Sunglasses",
                desc: "UV protection",
            },
            {
                icon: "🧴",
                name: "Sunscreen",
                desc: "SPF 50+",
            },
        ],
    },

    {
        type: "rainy",
        icon: "🌧️",
        label: "Rainy Day",
        temp: "18-25°C",
        items: [
            {
                icon: "🧥",
                name: "Waterproof Jacket",
                desc: "Stay dry",
            },
            {
                icon: "👢",
                name: "Rain Boots",
                desc: "Waterproof",
            },
            {
                icon: "☂️",
                name: "Umbrella",
                desc: "Compact fold",
            },
            {
                icon: "👖",
                name: "Dark Jeans",
                desc: "Quick dry",
            },
        ],
    },

    {
        type: "cold",
        icon: "❄️",
        label: "Cold & Windy",
        temp: "5-15°C",
        items: [
            {
                icon: "🧣",
                name: "Woolen Scarf",
                desc: "Neck warmth",
            },
            {
                icon: "🧤",
                name: "Gloves",
                desc: "Hand warmth",
            },
            {
                icon: "🧥",
                name: "Heavy Coat",
                desc: "Insulated",
            },
            {
                icon: "👢",
                name: "Boots",
                desc: "Warm lining",
            },
        ],
    },

    {
        type: "cloudy",
        icon: "⛅",
        label: "Cloudy & Mild",
        temp: "20-28°C",
        items: [
            {
                icon: "👔",
                name: "Light Shirt",
                desc: "Comfortable",
            },
            {
                icon: "👟",
                name: "Sneakers",
                desc: "All-day wear",
            },
            {
                icon: "🧢",
                name: "Cap",
                desc: "Just in case",
            },
            {
                icon: "👖",
                name: "Chinos",
                desc: "Smart casual",
            },
        ],
    },
];

const ACTIVITY_TYPES = [
    "Walking",
    "Running",
    "Cycling",
    "Yoga",
    "Swimming",
    "Gym",
    "Dancing",
    "Skipping",
];

const CAL_PER_MIN = {
    Walking: 4,
    Running: 10,
    Cycling: 8,
    Yoga: 3,
    Swimming: 9,
    Gym: 7,
    Dancing: 6,
    Skipping: 11,
};

const INITIAL_CHALLENGES = [
    {
        id: 1,
        icon: "🚶",
        title: "10K Steps",
        desc: "Walk 10,000 steps today",
        xp: 50,
        joined: false,
        progress: 0,
        total: 10000,
    },
    {
        id: 2,
        icon: "💧",
        title: "Hydration Hero",
        desc: "Drink 8 glasses of water",
        xp: 30,
        joined: false,
        progress: 0,
        total: 8,
    },
    {
        id: 3,
        icon: "🧘",
        title: "Zen Master",
        desc: "Meditate for 10 minutes",
        xp: 40,
        joined: false,
        progress: 0,
        total: 10,
    },
    {
        id: 4,
        icon: "🏃",
        title: "Cardio Blast",
        desc: "Run 5km this week",
        xp: 100,
        joined: false,
        progress: 0,
        total: 5,
    },
];

const SLEEP_DATA = [
    {
        stage: "Deep Sleep",
        hours: 1.5,
        col: "#4A4A6A",
        pct: 19,
    },
    {
        stage: "REM Sleep",
        hours: 1.8,
        col: "#C4B8E8",
        pct: 23,
    },
    {
        stage: "Light Sleep",
        hours: 4.2,
        col: "#F5C5A8",
        pct: 53,
    },
    {
        stage: "Awake",
        hours: 0.5,
        col: "#EBEBF0",
        pct: 6,
    },
];

const AI_RESPONSES = {
    diet:
        "Based on your profile, I recommend a balanced diet with 40% carbs, 30% protein, and 30% healthy fats. Try to eat every 3-4 hours to keep your metabolism active! 🥗",

    workout:
        "For your fitness level, I suggest starting with 30 minutes of cardio 3x per week, combined with strength training 2x per week. Always warm up for 5 minutes first! 💪",

    sleep:
        "Aim for 7-8 hours of sleep. Try to sleep and wake at the same time daily. Avoid screens 1 hour before bed and keep your room cool at 18-20°C. 😴",


    stress:
        "Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. Do this 4 times when feeling stressed. Also, a 10-minute walk can reduce stress by 30%! 🧘",

    water:
        "You should drink at least 8 glasses (2L) of water daily. Start your morning with a glass of warm water. Set reminders every 2 hours! 💧",

    default:
        "I'm here to help with your wellness journey! Ask me about diet, workouts, sleep, stress management, or hydration. I'll give you personalised advice! 🌟",
};

const WEEK_DAYS = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];

const DAILY_TIPS = [
    "Drink a glass of water before every meal 💧",
    "Take a 5-minute walk every hour ⏱️",
    "Sleep and wake at the same time daily 😴",
    "Eat slowly — it takes 20 min to feel full 🍽️",
    "10 min of sunlight improves mood by 40% ☀️",
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function calcBMI(weight, height) {
    return height > 0
        ? (weight / ((height / 100) ** 2)).toFixed(1)
        : 0;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            label: "Underweight",
            col: "#3B82F6",
        };
    }

    if (bmi < 25) {
        return {
            label: "Normal",
            col: "#10B981",
        };
    }

    if (bmi < 30) {
        return {
            label: "Overweight",
            col: "#F59E0B",
        };
    }

    return {
        label: "Obese",
        col: "#EF4444",
    };
}

function ringProps(pct, radius = 38) {
    const circumference = 2 * Math.PI * radius;

    return {
        strokeDasharray: `${circumference}`,
        strokeDashoffset: `${circumference * (1 - pct / 100)}`,
    };
}

function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good Morning";
    }

    if (hour < 17) {
        return "Good Afternoon";
    }

    return "Good Evening";
}

function getAIReply(message) {
    const text = message.toLowerCase();

    if (
        text.includes("diet") ||
        text.includes("food") ||
        text.includes("eat")
    ) {
        return AI_RESPONSES.diet;
    }

    if (
        text.includes("workout") ||
        text.includes("exercise") ||
        text.includes("gym")
    ) {
        return AI_RESPONSES.workout;
    }

    if (
        text.includes("sleep") ||
        text.includes("rest")
    ) {
        return AI_RESPONSES.sleep;
    }

    if (
        text.includes("stress") ||
        text.includes("anxi")
    ) {
        return AI_RESPONSES.stress;
    }

    if (
        text.includes("water") ||
        text.includes("hydra")
    ) {
        return AI_RESPONSES.water;
    }

    return AI_RESPONSES.default;
}

// ─────────────────────────────────────────────
// RUNNER FIGURE
// ─────────────────────────────────────────────

function RunFig({ size = 80 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 80 80"
            fill="none"
        >
            <circle
                cx="50"
                cy="12"
                r="8"
                fill="rgba(255,255,255,0.9)"
            />

            <line
                x1="50"
                y1="20"
                x2="44"
                y2="40"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="44"
                y1="40"
                x2="30"
                y2="52"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="30"
                y1="52"
                x2="22"
                y2="68"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="44"
                y1="40"
                x2="58"
                y2="52"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="58"
                y1="52"
                x2="64"
                y2="68"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="44"
                y1="28"
                x2="32"
                y2="22"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="44"
                y1="28"
                x2="56"
                y2="34"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

// ─────────────────────────────────────────────
// PROGRESS RING
// ─────────────────────────────────────────────

function Ring({
    pct,
    col,
    size = 90,
    stroke = 8,
    label,
    sublabel,
}) {
    const radius = (size - stroke * 2) / 2;
    const ring = ringProps(pct, radius);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: size,
                    height: size,
                }}
            >
                <svg
                    width={size}
                    height={size}
                    style={{
                        transform: "rotate(-90deg)",
                    }}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#EBEBF0"
                        strokeWidth={stroke}
                    />

                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={col}
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        {...ring}
                        style={{
                            transition:
                                "stroke-dashoffset .6s ease",
                        }}
                    />
                </svg>

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            fontSize: size > 70 ? 16 : 13,
                            fontWeight: 800,
                            color: "#1C1C1E",
                        }}
                    >
                        {pct}%
                    </div>
                </div>
            </div>

            {label && (
                <div
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#1C1C1E",
                    }}
                >
                    {label}
                </div>
            )}

            {sublabel && (
                <div
                    style={{
                        fontSize: 11,
                        color: "#8A8A9A",
                    }}
                >
                    {sublabel}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────

const NAV = [
    {
        id: "home",
        icon: "🏠",
        label: "Home",
    },
    {
        id: "diet",
        icon: "🥗",
        label: "Diet",
    },
    {
        id: "wellness",
        icon: "🧘",
        label: "Wellness",
    },
    {
        id: "activity",
        icon: "⚡",
        label: "Activity",
    },
    {
        id: "profile",
        icon: "👤",
        label: "Profile",
    },
];

// ─────────────────────────────────────────────
// HOME SCREEN
// ─────────────────────────────────────────────

function HomeScreen({
    profile,
    water,
    setWater,
    mood,
    challenges,
    setChallenges,
}) {
    const bmi = calcBMI(
        profile.weight,
        profile.height
    );
const userStorageKey = profile?.email
    ? profile.email.toLowerCase()
    : "guest";
const userWeight = Number(profile?.weight) || 0;
const userHeight = Number(profile?.height) || 0;
const userAge = Number(profile?.age) || 25;

let calorieTarget = 0;

if (userWeight > 0 && userHeight > 0) {
    // Estimated BMR using available profile information.
    const bmr =
        10 * userWeight +
        6.25 * userHeight -
        5 * userAge +
        83;

    // Light daily activity baseline.
    let target = bmr * 1.35;

    // Adjust according to BMI category.
    if (bmi < 18.5) {
        target += 300;
    } else if (bmi >= 25 && bmi < 30) {
        target -= 300;
    } else if (bmi >= 30) {
        target -= 500;
    }

    calorieTarget = Math.round(target / 50) * 50;
}

const [consumedCalories, setConsumedCalories] =
    useState(0);

useEffect(() => {
    const loadConsumedCalories = () => {
        if (!profile?.email) {
            setConsumedCalories(0);
            return;
        }

        const savedFoods = localStorage.getItem(
            `humanos_diet_${profile.email.toLowerCase()}`
        );

        if (savedFoods) {
            try {
                const foods = JSON.parse(savedFoods);

                const total = foods.reduce(
                    (sum, food) =>
                        sum + Number(food.cal || 0),
                    0
                );

                setConsumedCalories(total);
            } catch (error) {
                console.error(
                    "CALORIE LOAD ERROR:",
                    error
                );
                setConsumedCalories(0);
            }
        } else {
            setConsumedCalories(0);
        }
    };

    loadConsumedCalories();

    window.addEventListener(
        "humanos-diet-updated",
        loadConsumedCalories
    );

    return () => {
        window.removeEventListener(
            "humanos-diet-updated",
            loadConsumedCalories
        );
    };
}, [profile?.email]);

    const bmiCat = getBMICategory(bmi);

    const waterPct = Math.round(
        (water / 8) * 100
    );

    const tip =
        DAILY_TIPS[
            new Date().getDay() %
                DAILY_TIPS.length
        ];

    const weekData = (() => {
    try {
        const key = profile?.email
            ? `humanos_activities_${profile.email.toLowerCase()}`
            : null;

        if (!key) {
            return [0, 0, 0, 0, 0, 0, 0];
        }

        const saved = localStorage.getItem(key);
        const activities = saved
            ? JSON.parse(saved)
            : [];

        const data = [0, 0, 0, 0, 0, 0, 0];

        const monday = new Date();
        const day = monday.getDay() || 7;

        monday.setDate(
            monday.getDate() - day + 1
        );

        monday.setHours(0, 0, 0, 0);

        activities.forEach((item) => {
            const date = new Date(
                item.recordedAt ||
                item.createdAt
            );

            if (date >= monday) {
                const index =
                    (date.getDay() + 6) % 7;

                data[index] += Number(
                    item.durationMinutes ??
                    item.minutes ??
                    0
                );
            }
        });

        const max = Math.max(...data, 1);

        return data.map((value) =>
            value === 0
                ? 0
                : Math.max(
                      8,
                      Math.round(
                          (value / max) * 60
                      )
                  )
        );
    } catch (error) {
        console.error(
            "WEEKLY ACTIVITY ERROR:",
            error
        );

        return [0, 0, 0, 0, 0, 0, 0];
    }
})();

    return (
        <div
            style={{
                padding: "16px 16px 0",
            }}
        >
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        color: "#8A8A9A",
                        fontWeight: 500,
                    }}
                >
                    {getGreeting()} 👋
                </div>

                <div
                    style={{
                        fontFamily:
                            "'DM Serif Display',serif",
                        fontSize: 26,
                        color: "#1C1C1E",
                    }}
                >
                    Hey,{" "}
                    <span
                        style={{
                            color: "#4A4A6A",
                            fontStyle: "italic",
                        }}
                    >
                        {profile.name || "User"}
                    </span>
                </div>
            </div>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#4A4A6A,#7C6A9A)",
                    borderRadius: 24,
                    padding:
                        "20px 20px 20px 24px",
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                        "space-between",
                    boxShadow:
                        "0 8px 32px rgba(74,74,106,.3)",
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            color:
                                "rgba(255,255,255,.7)",
                            fontWeight: 600,
                            marginBottom: 4,
                        }}
                    >
                        TODAY'S GOAL
                    </div>

                    <div
                        style={{
                            fontFamily:
                                "'DM Serif Display',serif",
                            fontSize: 32,
                            color: "#fff",
                            lineHeight: 1,
                        }}
                    >
                        {calorieTarget.toLocaleString()}
                    </div>

                    <div
                        style={{
                            fontSize: 13,
                            color:
                                "rgba(255,255,255,.8)",
                            marginTop: 4,
                        }}
                    >
                        kcal target
                    </div>

                    <div
                        style={{
                            marginTop: 12,
                            background:
                                "rgba(255,255,255,.15)",
                            borderRadius: 100,
                            padding: "6px 14px",
                            display: "inline-block",
                            fontSize: 12,
                            color: "#fff",
                            fontWeight: 600,
                        }}
                    >
                       <div>
    {consumedCalories.toLocaleString()} consumed
</div>

<div
    style={{
        marginTop: 6,
        fontSize: 12,
        fontWeight: 500,
        color: "#fff",
        opacity: 0.85,
    }}
>
    {Math.max(
        calorieTarget - consumedCalories,
        0
    ).toLocaleString()} kcal remaining
</div>

<div
    style={{
        marginTop: 8,
        height: 5,
        background: "rgba(255,255,255,0.25)",
        borderRadius: 100,
        overflow: "hidden",
    }}
>
    <div
        style={{
            height: "100%",
            width: `${Math.min(
                (consumedCalories /
                    Math.max(calorieTarget, 1)) *
                    100,
                100
            )}%`,
            background: "#fff",
            borderRadius: 100,
        }}
    />
</div>
                    </div>
                </div>

                <RunFig size={90} />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr 1fr",
                    gap: 10,
                    marginBottom: 16,
                }}
            >
                {[
                    {
                        icon: "⚖️",
                        label: "BMI",
                        value: bmi,
                        sub: bmiCat.label,
                        col: bmiCat.col,
                    },
                    {
                        icon: "💧",
                        label: "Water",
                        value: `${water}/8`,
                        sub: "glasses",
                        col: "#2563EB",
                    },
                    {
                        icon: "😊",
                        label: "Mood",
                        value: mood
                            ? MOOD_LIST.find(
                                  (m) => m.id === mood
                              )?.emoji
                            : "—",
                        sub: mood || "Not set",
                        col: "#8B5CF6",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        style={{
                            background: "#fff",
                            borderRadius: 18,
                            padding: "14px 12px",
                            boxShadow: "0 2px 12px rgba(0,0,0,.06)",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 22 }}>{item.icon}</div>
                        <div
                            style={{
                                fontSize: 11,
                                color: "#8A8A9A",
                                fontWeight: 600,
                                marginTop: 4,
                                textTransform: "uppercase",
                            }}
                        >
                            {item.label}
                        </div>
                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 800,
                                color: item.col,
                                margin: "4px 0 2px",
                            }}
                        >
                            {item.value}
                        </div>
                        <div
                            style={{
                                fontSize: 10,
                                color: "#8A8A9A",
                            }}
                        >
                            {item.sub}
                        </div>

                        {item.label === "Water" && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 5,
                                    marginTop: 8,
                                }}
                            >
                                <button
                                    onClick={() => {
const newWater = Math.max(0, water - 1);

    setWater(newWater);

    setChallenges((prev) => {
        const updated = prev.map((challenge) => {
            if (
                challenge.id === 2 &&
                challenge.joined
            ) {
                return {
                    ...challenge,
                    progress: Math.round(
                        (newWater / 8) * 100
                    ),
                };
            }

            return challenge;
        });

        if (profile?.email) {
            localStorage.setItem(
                `humanos_challenges_${profile.email.toLowerCase()}`,
                JSON.stringify(updated)
            );
        }

        return updated;
    });
}}
                                    style={{
                                        border: "none",
                                        borderRadius: 8,
                                        width: 26,
                                        height: 24,
                                        cursor: "pointer",
                                        background: "#EEF2FF",
                                        color: "#4A4A6A",
                                        fontWeight: 800,
                                    }}
                                >
                                    −
                                </button>
                                <button
    onClick={() =>
        setWater((v) => Math.min(8, v + 1))
    }
    style={{
        border: "none",
        borderRadius: 8,
        width: 26,
        height: 24,
        cursor: "pointer",
        background: "#DBEAFE",
        color: "#2563EB",
        fontWeight: 800,
    }}
>
    +
</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 16,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1C1C1E",
                        marginBottom: 12,
                    }}
                >
                    Weekly Activity
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems:
                            "flex-end",
                        gap: 6,
                        height: 60,
                    }}
                >
                    {weekData.map(
                        (value, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection:
                                        "column",
                                    alignItems:
                                        "center",
                                    gap: 4,
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        borderRadius: 6,
                                        background:
                                            index ===
                                            6
                                                ? "#4A4A6A"
                                                : "#C4B8E8",
                                        height: `${
                                            (value /
                                                80) *
                                            60
                                        }px`,
                                    }}
                                />

                                <div
                                    style={{
                                        fontSize: 9,
                                        color: "#8A8A9A",
                                    }}
                                >
                                    {
                                        WEEK_DAYS[
                                            index
                                        ]
                                    }
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#EFF6FF,#DBEAFE)",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <Ring
                    pct={waterPct}
                    col="#2563EB"
                    size={72}
                    stroke={7}
                />

                <div>
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#1C1C1E",
                        }}
                    >
                        Hydration Today
                    </div>

                    <div
                        style={{
                            fontSize: 22,
                            fontWeight: 800,
                            color: "#2563EB",
                            margin: "4px 0",
                        }}
                    >
                        {water}{" "}
                        <span
                            style={{
                                fontSize: 14,
                            }}
                        >
                            / 8 glasses
                        </span>
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: "#8A8A9A",
                        }}
                    >
                        {water >= 8
                            ? "✅ Goal reached!"
                            : `${8 - water} more glasses to go`}
                    </div>
                </div>
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 16,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1C1C1E",
                        marginBottom: 10,
                    }}
                >
                    Active Challenges
                </div>

                {challenges.filter(
                    (challenge) =>
                        challenge.joined
                ).length === 0 ? (
                    <div
                        style={{
                            fontSize: 13,
                            color: "#8A8A9A",
                            textAlign: "center",
                            padding: "12px 0",
                        }}
                    >
                        No challenges joined
                        yet! Go to Activity
                        tab 🏆
                    </div>
                ) : (
                    challenges
                        .filter(
                            (challenge) =>
                                challenge.joined
                        )
                        .map((challenge) => (
                            <div
                                key={
                                    challenge.id
                                }
                                style={{
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    gap: 10,
                                    marginBottom: 8,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 20,
                                    }}
                                >
                                    {
                                        challenge.icon
                                    }
                                </span>

                                <div
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                            color: "#1C1C1E",
                                        }}
                                    >
                                        {
                                            challenge.title
                                        }
                                    </div>

                                    <div
                                        style={{
                                            height: 6,
                                            background:
                                                "#F5F5F5",
                                            borderRadius: 100,
                                            marginTop: 4,
                                        }}
                                    >
                                        <div
                                            style={{
                                                height: "100%",
                                                borderRadius:
                                                    100,
                                                background:
                                                    "#4A4A6A",
                                               width: `${
    challenge.id === 2
        ? Math.min((water / 8) * 100, 100)
        : Math.min(
              (challenge.progress /
                  challenge.total) *
                  100,
              100
          )
}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        fontSize: 11,
                                        fontWeight: 700,
                                        color: "#4A4A6A",
                                    }}
                                >
                                    +{challenge.xp}XP
                                </div>
                            </div>
                        ))
                )}
            </div>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 16,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: "#7C3AED",
                        letterSpacing: ".06em",
                        marginBottom: 6,
                    }}
                     >
                    💡 DAILY TIP
                </div>

                <div
                    style={{
                        fontSize: 14,
                        color: "#1C1C1E",
                        fontWeight: 500,
                        lineHeight: 1.6,
                    }}
                >
                    {tip}
                </div>
            </div>
        </div>
    );
}
// ─────────────────────────────────────────────
// DIET SCREEN
// ─────────────────────────────────────────────

function DietScreen({ profile }) {
    const [goal, setGoal] = useState("loss");
    const [dietType, setDietType] = useState("veg");
    const [meal, setMeal] = useState("Breakfast");
    const [loggedFoods, setLoggedFoods] = useState([]);
    useEffect(() => {
    if (!profile?.email) return;

    const savedFoods = localStorage.getItem(
        `humanos_diet_${profile.email.toLowerCase()}`
    );

    if (savedFoods) {
        try {
           const foods = JSON.parse(savedFoods);

const now = new Date();

const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
).getTime();

const startOfTomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
).getTime();

const todaysFoods = foods.filter(
    (food) =>
        food.logId >= startOfToday &&
        food.logId < startOfTomorrow
);

setLoggedFoods(todaysFoods);
        } catch (error) {
            console.error(
                "DIET LOAD ERROR:",
                error
            );
        }
    }
}, [profile?.email]);


    const meals = ["Breakfast", "Lunch", "Snacks", "Dinner"];

    const currentFoods =
        DIET[goal]?.[dietType]?.[meal] || [];

    const totalCalories = loggedFoods.reduce(
        (sum, food) => sum + food.cal,
        0
    );

    const totalProtein = loggedFoods.reduce(
        (sum, food) => sum + food.pro,
        0
    );

   const logFood = (food) => {
    setLoggedFoods((prev) => {
        const updated = [
            ...prev,
            {
                ...food,
                logId:
                    Date.now() +
                    Math.random(),
            },
        ];

        if (profile?.email) {
            localStorage.setItem(
                `humanos_diet_${profile.email.toLowerCase()}`,
                JSON.stringify(updated)
            );
        }
        window.dispatchEvent(
    new Event("humanos-diet-updated")
);
        return updated;
    });
};

    return (
        <div
            style={{
                padding: "16px 16px 0",
            }}
        >
            <div
                style={{
                    fontFamily:
                        "'DM Serif Display',serif",
                    fontSize: 24,
                    color: "#1C1C1E",
                    marginBottom: 16,
                }}
            >
                Your{" "}
                <span
                    style={{
                        color: "#4A4A6A",
                        fontStyle: "italic",
                    }}
                >
                    Diet
                </span>
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#8A8A9A",
                        marginBottom: 8,
                    }}
                >
                    YOUR GOAL
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 8,
                    }}
                >
                    {[
                        {
                            id: "loss",
                            label: "🔥 Weight Loss",
                        },
                        {
                            id: "gain",
                            label: "💪 Weight Gain",
                        },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                setGoal(item.id)
                            }
                            style={{
                                flex: 1,
                                border:
                                    goal === item.id
                                        ? "2px solid #4A4A6A"
                                        : "2px solid #EBEBF0",
                                background:
                                    goal === item.id
                                        ? "#F5F3FF"
                                        : "#fff",
                                color:
                                    goal === item.id
                                        ? "#4A4A6A"
                                        : "#8A8A9A",
                                borderRadius: 12,
                                padding: "10px 8px",
                                fontWeight: 700,
                                fontSize: 12,
                                cursor: "pointer",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#8A8A9A",
                        marginTop: 14,
                        marginBottom: 8,
                    }}
                >
                    DIET TYPE
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 8,
                    }}
                >
                    {[
                        {
                            id: "veg",
                            label: "🥗 Vegetarian",
                        },
                        {
                            id: "nonveg",
                            label: "🍗 Non-Vegetarian",
                        },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                setDietType(
                                    item.id
                                )
                            }
                            style={{
                                flex: 1,
                                border:
                                    dietType ===
                                    item.id
                                        ? "2px solid #10B981"
                                        : "2px solid #EBEBF0",
                                background:
                                    dietType ===
                                    item.id
                                        ? "#ECFDF5"
                                        : "#fff",
                                color:
                                    dietType ===
                                    item.id
                                        ? "#059669"
                                        : "#8A8A9A",
                                borderRadius: 12,
                                padding: "10px 8px",
                                fontWeight: 700,
                                fontSize: 12,
                                cursor: "pointer",
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: 6,
                    marginBottom: 14,
                    overflowX: "auto",
                    paddingBottom: 2,
                }}
            >
                {meals.map((item) => (
                    <button
                        key={item}
                        onClick={() =>
                            setMeal(item)
                        }
                        style={{
                            flex: "0 0 auto",
                            border: "none",
                            borderRadius: 100,
                            padding: "9px 16px",
                            background:
                                meal === item
                                    ? "#4A4A6A"
                                    : "#fff",
                            color:
                                meal === item
                                    ? "#fff"
                                    : "#8A8A9A",
                            fontWeight: 700,
                            fontSize: 12,
                            cursor: "pointer",
                            boxShadow:
                                "0 2px 8px rgba(0,0,0,.05)",
                        }}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: 11,
                                color: "#7C3AED",
                                fontWeight: 700,
                            }}
                        >
                            TODAY'S LOG
                        </div>

                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 800,
                                color: "#4A4A6A",
                                marginTop: 3,
                            }}
                        >
                            {totalCalories} kcal
                        </div>
                    </div>

                    <div
                        style={{
                            textAlign: "right",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                color: "#8A8A9A",
                            }}
                        >
                            Protein
                        </div>

                        <div
                            style={{
                                fontSize: 18,
                                fontWeight: 800,
                                color: "#10B981",
                            }}
                        >
                            {totalProtein}g
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1C1C1E",
                    marginBottom: 10,
                }}
            >
                Recommended for {meal}
            </div>

            {currentFoods.map((food, index) => (
                <div
                    key={`${food.name}-${index}`}
                    style={{
                        background: "#fff",
                        borderRadius: 18,
                        padding: 14,
                        marginBottom: 10,
                        boxShadow:
                            "0 2px 12px rgba(0,0,0,.06)",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            gap: 10,
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#1C1C1E",
                                }}
                            >
                                {food.name}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    marginTop: 6,
                                    fontSize: 10,
                                    color: "#8A8A9A",
                                }}
                            >
                                <span>
                                    🔥 {food.cal} kcal
                                </span>

                                <span>
                                    💪 {food.pro}g
                                </span>

                                <span>
                                    🌾 {food.carb}g
                                </span>

                                <span>
                                    🥑 {food.fat}g
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                logFood(food)
                            }
                            style={{
                                border: "none",
                                background: "#4A4A6A",
                                color: "#fff",
                                borderRadius: 100,
                                padding:
                                    "8px 13px",
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: "pointer",
                                alignSelf:
                                    "center",
                            }}
                        >
                            + Log
                        </button>
                    </div>
                </div>
            ))}

            {loggedFoods.length > 0 && (
                <div
                    style={{
                        background: "#ECFDF5",
                        borderRadius: 18,
                        padding: 14,
                        marginTop: 14,
                        marginBottom: 14,
                    }}
                >
                    <div
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#059669",
                            marginBottom: 8,
                        }}
                    >
                        ✓ Logged Today
                    </div>

                    {loggedFoods.map(
                        (food) => (
                            <div
                                key={food.logId}
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    fontSize: 11,
                                    color: "#4A4A6A",
                                    padding:
                                        "4px 0",
                                }}
                            >
                                <span>
                                    {food.name}
                                </span>

                                <span>
                                    {food.cal} kcal
                                </span>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// WELLNESS SCREEN
// ─────────────────────────────────────────────

function WellnessScreen({
    mood,
    setMood,
}) {
    const [breathing, setBreathing] =
        useState(false);

    const [breathPhase, setBreathPhase] =
        useState("inhale");

    const [breathCount, setBreathCount] =
        useState(4);

    const moodData = mood
        ? MOOD_DATA[mood]
        : null;

    // IMPORTANT:
    // useEffect is required here.
    // This must NOT be useState.
    useEffect(() => {
        if (!breathing) {
            setBreathPhase("inhale");
            setBreathCount(4);
            return undefined;
        }

        const phases = [
            {
                phase: "inhale",
                count: 4,
            },
            {
                phase: "hold",
                count: 7,
            },
            {
                phase: "exhale",
                count: 8,
            },
        ];

        let phaseIndex = 0;
        let count = phases[0].count;

        setBreathPhase(
            phases[0].phase
        );
        setBreathCount(count);

        const timer = setInterval(() => {
            count -= 1;

            if (count <= 0) {
                phaseIndex =
                    (phaseIndex + 1) %
                    phases.length;

                count =
                    phases[
                        phaseIndex
                    ].count;

                setBreathPhase(
                    phases[
                        phaseIndex
                    ].phase
                );
            }

            setBreathCount(count);
        }, 1000);

        return () =>
            clearInterval(timer);
    }, [breathing]);

    return (
        <div
            style={{
                padding: "16px 16px 0",
            }}
        >
            <div
                style={{
                    fontFamily:
                        "'DM Serif Display',serif",
                    fontSize: 24,
                    color: "#1C1C1E",
                    marginBottom: 16,
                }}
            >
                Mind &{" "}
                <span
                    style={{
                        color: "#4A4A6A",
                        fontStyle: "italic",
                    }}
                >
                    Wellness
                </span>
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1C1C1E",
                        marginBottom: 12,
                    }}
                >
                    How are you feeling?
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        gap: 4,
                    }}
                >
                    {MOOD_LIST.map((m) => (
                        <button
                            key={m.id}
                            onClick={() =>
                                setMood(m.id)
                            }
                            style={{
                                display: "flex",
                                flexDirection:
                                    "column",
                                alignItems:
                                    "center",
                                gap: 4,
                                background:
                                    mood === m.id
                                        ? `${m.col}20`
                                        : "transparent",
                                border:
                                    mood === m.id
                                        ? `2px solid ${m.col}`
                                        : "2px solid transparent",
                                borderRadius: 16,
                                padding:
                                    "10px 8px",
                                cursor: "pointer",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 28,
                                }}
                            >
                                {m.emoji}
                            </div>

                            <div
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color:
                                        mood ===
                                        m.id
                                            ? m.col
                                            : "#8A8A9A",
                                }}
                            >
                                {m.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {moodData && (
                <div
                    style={{
                        background:
                            "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
                        borderRadius: 20,
                        padding: 16,
                        marginBottom: 14,
                        boxShadow:
                            "0 2px 12px rgba(0,0,0,.06)",
                    }}
                >
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#7C3AED",
                            marginBottom: 10,
                        }}
                    >
                        Recommendations for you
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: "#4A4A6A",
                            fontWeight: 600,
                            marginBottom: 6,
                        }}
                    >
                        🥗 Foods
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginBottom: 10,
                        }}
                    >
                        {moodData.foods.map(
                            (food, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background:
                                            "rgba(255,255,255,.7)",
                                        borderRadius:
                                            100,
                                        padding:
                                            "5px 12px",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#4A4A6A",
                                    }}
                                >
                                    {food}
                                </div>
                            )
                        )}
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: "#4A4A6A",
                            fontWeight: 600,
                            marginBottom: 6,
                        }}
                    >
                        ⚡ Activities
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            marginBottom: 10,
                        }}
                    >
                        {moodData.activities.map(
                            (
                                activity,
                                index
                            ) => (
                                <div
                                    key={index}
                                    style={{
                                        background:
                                            "rgba(255,255,255,.7)",
                                        borderRadius:
                                            100,
                                        padding:
                                            "5px 12px",
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#4A4A6A",
                                    }}
                                >
                                    {activity}
                                </div>
                            )
                        )}
                    </div>

                    <div
                        style={{
                            background:
                                "rgba(255,255,255,.6)",
                            borderRadius: 14,
                            padding:
                                "10px 14px",
                            fontSize: 13,
                            color: "#4A4A6A",
                            fontWeight: 500,
                            lineHeight: 1.5,
                        }}
                    >
                        💡 {moodData.tip}
                    </div>
                </div>
            )}

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                    textAlign: "center",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1C1C1E",
                        marginBottom: 4,
                    }}
                >
                    4-7-8 Breathing
                </div>

                <div
                    style={{
                        fontSize: 12,
                        color: "#8A8A9A",
                        marginBottom: 16,
                    }}
                >
                    A simple breathing exercise
                    for relaxation
                </div>

                <div
                    style={{
                        position: "relative",
                        width: 140,
                        height: 140,
                        margin:
                            "0 auto 16px",
                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >
                    <div
                        style={{
                            position:
                                "absolute",
                            width: 140,
                            height: 140,
                            borderRadius:
                                "50%",
                            background:
                                breathing
                                    ? "linear-gradient(135deg,#C4B8E8,#7C3AED)"
                                    : "#F5F3FF",
                            transition:
                                "all 1s ease",
                            transform:
                                breathing &&
                                breathPhase ===
                                    "inhale"
                                    ? "scale(1.15)"
                                    : breathing &&
                                      breathPhase ===
                                          "exhale"
                                    ? "scale(.9)"
                                    : "scale(1)",
                            opacity: 0.7,
                        }}
                    />

                    <div
                        style={{
                            position:
                                "relative",
                            zIndex: 1,
                            textAlign:
                                "center",
                        }}
                    >
                        {breathing ? (
                            <>
                                <div
                                    style={{
                                        fontSize: 28,
                                        fontWeight: 800,
                                        color: "#4A4A6A",
                                    }}
                                >
                                    {
                                        breathCount
                                    }
                                </div>

                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#7C3AED",
                                        textTransform:
                                            "capitalize",
                                    }}
                                >
                                    {
                                        breathPhase
                                    }
                                </div>
                            </>
                        ) : (
                            <div
                                style={{
                                    fontSize: 32,
                                }}
                            >
                                🧘
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() =>
                        setBreathing(
                            (value) =>
                                !value
                        )
                    }
                    style={{
                        background:
                            breathing
                                ? "#EF4444"
                                : "#4A4A6A",
                        border: "none",
                        borderRadius: 100,
                        padding:
                            "12px 28px",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                        fontFamily:
                            "'DM Sans',sans-serif",
                    }}
                >
                    {breathing
                        ? "Stop"
                        : "Start Breathing"}
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// ACTIVITY SCREEN
// ─────────────────────────────────────────────

function ActivityScreen({
    challenges,
    setChallenges,
    profile,
}) {
    const [activity, setActivity] =
        useState("Walking");

    const [minutes, setMinutes] =
        useState(30);

    const [activities, setActivities] =
        useState([]);
    const userStorageKey = profile?.email
    ? profile.email.toLowerCase()
    : "guest";

useEffect(() => {
    const loadActivities = async () => {
        try {
            const token =
                localStorage.getItem("accessToken") ||
                localStorage.getItem("token");

            if (!token) {
                setActivities([]);
                return;
            }

            const response = await fetch(
                "https://humanos-p8rl.onrender.com/api/activity",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();

            console.log(
                "ACTIVITY RESPONSE:",
                result
            );

            if (response.ok && result.success) {
                const savedActivities =
                    result.data?.activities || [];

                setActivities(savedActivities);

                if (profile?.email) {
                    localStorage.setItem(
                        `humanos_activities_${profile.email.toLowerCase()}`,
                        JSON.stringify(savedActivities)
                    );
                }
            }
        } catch (error) {
            console.error(
                "ACTIVITY LOAD ERROR:",
                error
            );
        }
    };

    loadActivities();
}, [profile?.email]);

    const calories = Math.round(
        minutes *
            (CAL_PER_MIN[activity] || 4)
    );

    const addActivity = () => {
        if (minutes <= 0) {
            return;
        }

        const token =
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token");

fetch("https://humanos-p8rl.onrender.com/api/activity", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        type: activity.toLowerCase(),
        durationMinutes: minutes,
        calories: calories,
        recordedAt: new Date().toISOString(),
    }),
})
    .then(async (response) => {
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result?.error?.message ||
                "Failed to save activity"
            );
        }

        const savedActivity = result.data.activity;

       setActivities((prev) => {
    const updated = [
        savedActivity,
        ...prev,
    ];

    localStorage.setItem(
        `humanos_activities_${userStorageKey}`,
        JSON.stringify(updated)
    );

    return updated;
});
    })
    .catch((error) => {
        console.error("ACTIVITY SAVE ERROR:", error);
        alert("Unable to save activity. Please try again.");
    });

        setChallenges((prev) => {
            const updated = prev.map((challenge) => {
                if (
                    challenge.id === 1 &&
                    challenge.joined
                ) {
                    return {
                        ...challenge,
                        progress:
                            Math.min(
                                challenge.total,
                                challenge.progress +
                                    minutes *
                                        100
                            ),
                    };
                }
                if (
    challenge.id === 3 &&
    challenge.joined &&
    activity === "Yoga"
) {
    return {
        ...challenge, 
        progress: Math.min(
            challenge.total,
            challenge.progress + minutes
        ),
    };
}
                if (
                    challenge.id === 4 &&
                    challenge.joined &&
                    activity ===
                        "Running"
                ) {
                    return {
                        ...challenge,
                        progress:
                            Math.min(
                                challenge.total,
                                challenge.progress +
                                    minutes /
                                        10
                            ),
                    };
                }

                return challenge;
             });

    localStorage.setItem(
        `humanos_challenges_${profile.email.toLowerCase()}`,
        JSON.stringify(updated)
    );

    return updated;
});
    };

    useEffect(() => {
    if (!profile?.email) return;

    const savedChallenges = localStorage.getItem(
        `humanos_challenges_${profile.email.toLowerCase()}`
    );

    if (savedChallenges) {
        setChallenges(JSON.parse(savedChallenges));
    }
}, [profile?.email, setChallenges]);

    const joinChallenge = (id) => {
    setChallenges((prev) => {
        const updated = prev.map((challenge) =>
            challenge.id === id
                ? {
                      ...challenge,
                      joined: !challenge.joined,
                  }
                : challenge
        );

        localStorage.setItem(
            `humanos_challenges_${profile?.email?.toLowerCase()}`,
            JSON.stringify(updated)
        );

        return updated;
    });
};

    const totalCalories =
        activities.reduce(
            (sum, item) =>
                sum + item.calories,
            0
        );

    const totalMinutes =
    activities.reduce(
        (sum, item) =>
            sum +
            Number(
                item.durationMinutes ??
                item.minutes ??
                0
            ),
        0
    );

    return (
        <div
            style={{
                padding: "16px 16px 0",
            }}
        >
            <div
                style={{
                    fontFamily:
                        "'DM Serif Display',serif",
                    fontSize: 24,
                    color: "#1C1C1E",
                    marginBottom: 16,
                }}
            >
                Move &{" "}
                <span
                    style={{
                        color: "#4A4A6A",
                        fontStyle: "italic",
                    }}
                >
                    Thrive
                </span>
            </div>

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#4A4A6A,#7C6A9A)",
                    borderRadius: 22,
                    padding: 18,
                    marginBottom: 14,
                    color: "#fff",
                    boxShadow:
                        "0 8px 28px rgba(74,74,106,.25)",
                }}
            >
                <div
                    style={{
                        fontSize: 11,
                        opacity: 0.7,
                        fontWeight: 700,
                    }}
                >
                    TODAY'S ACTIVITY
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: 30,
                        marginTop: 10,
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 800,
                            }}
                        >
                            {totalMinutes}
                        </div>

                        <div
                            style={{
                                fontSize: 11,
                                opacity: 0.75,
                            }}
                        >
                            minutes
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 800,
                            }}
                        >
                            {totalCalories}
                        </div>

                        <div
                            style={{
                                fontSize: 11,
                                opacity: 0.75,
                            }}
                        >
                            kcal burned
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 12,
                    }}
                >
                    Log Activity
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "1fr 90px",
                        gap: 8,
                    }}
                >
                    <select
                        value={activity}
                        onChange={(e) =>
                            setActivity(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            border:
                                "1.5px solid #EBEBF0",
                            borderRadius: 12,
                            padding:
                                "11px 12px",
                            fontSize: 13,
                            background: "#fff",
                            color: "#1C1C1E",
                            outline: "none",
                        }}
                    >
                        {ACTIVITY_TYPES.map(
                            (type) => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {type}
                                </option>
                            )
                        )}
                    </select>

                    <input
                        type="number"
                        min="1"
                        value={minutes}
                        onChange={(e) =>
                            setMinutes(
                                Number(
                                    e.target
                                        .value
                                )
                            )
                        }
                        style={{
                            width: "100%",
                            boxSizing:
                                "border-box",
                            border:
                                "1.5px solid #EBEBF0",
                            borderRadius: 12,
                            padding:
                                "11px 12px",
                            fontSize: 13,
                            outline: "none",
                        }}
                    />
                </div>

                <button
                    onClick={addActivity}
                    style={{
                        width: "100%",
                        marginTop: 10,
                        border: "none",
                        borderRadius: 12,
                        padding: 12,
                        background: "#4A4A6A",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                    }}
                >
                    + Log Activity
                </button>
            </div>

            {activities.length > 0 && (
                <div
                    style={{
                        background: "#fff",
                        borderRadius: 20,
                        padding: 16,
                        marginBottom: 14,
                        boxShadow:
                            "0 2px 12px rgba(0,0,0,.06)",
                    }}
                >
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            marginBottom: 10,
                        }}
                    >
                        Today's Activities
                    </div>

                    {activities.map(
                        (item) => (
                            <div
                                key={item.id}
                                style={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "space-between",
                                    padding:
                                        "9px 0",
                                    borderBottom:
                                        "1px solid #F5F5F5",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {item.type}
                                    </div>

                                    <div
                                        style={{
                                            fontSize: 10,
                                            color: "#8A8A9A",
                                            marginTop: 2,
                                        }}
                                    >
                                       {
                                         Number(
                                             item.durationMinutes ??
                                              item.minutes ??
                                             0
                                              )
                                            }{" "}
                                            minutes
                                    </div>
                                </div>

                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#10B981",
                                    }}
                                >
                                    +{item.calories} kcal
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            <div
                style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 10,
                }}
            >
                Challenges
            </div>

            {challenges.map(
                (challenge) => (
                    <div
                        key={challenge.id}
                        style={{
                            background: "#fff",
                            borderRadius: 18,
                            padding: 14,
                            marginBottom: 10,
                            boxShadow:
                                "0 2px 12px rgba(0,0,0,.06)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 10,
                            }}
                        >
                            <div
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius:
                                        14,
                                    background:
                                        "#F5F3FF",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    fontSize: 22,
                                }}
                            >
                                {
                                    challenge.icon
                                }
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: "#1C1C1E",
                                    }}
                                >
                                    {
                                        challenge.title
                                    }
                                </div>

                                <div
                                    style={{
                                        fontSize: 10,
                                        color: "#8A8A9A",
                                        marginTop: 2,
                                    }}
                                >
                                    {
                                        challenge.desc
                                    }
                                </div>
                            </div>

                            <button
                                onClick={() =>
                                    joinChallenge(
                                        challenge.id
                                    )
                                }
                                style={{
                                    border:
                                        "none",
                                    borderRadius:
                                        100,
                                    padding:
                                        "7px 12px",
                                    background:
                                        challenge.joined
                                            ? "#ECFDF5"
                                            : "#4A4A6A",
                                    color:
                                        challenge.joined
                                            ? "#059669"
                                            : "#fff",
                                    fontWeight: 700,
                                    fontSize: 10,
                                    cursor:
                                        "pointer",
                                }}
                            >
                                {challenge.joined
                                    ? "Joined ✓"
                                    : "Join"}
                            </button>
                        </div>

                        {challenge.joined && (
                            <div
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        fontSize: 9,
                                        color: "#8A8A9A",
                                        marginBottom:
                                            4,
                                    }}
                                >
                                    <span>
                                        Progress
                                    </span>

                                    <span>
                                        {Math.round(
                                            Math.min(
                                                100,
                                                (challenge.progress /
                                                    challenge.total) *
                                                    100
                                            )
                                        )}
                                        %
                                    </span>
                                </div>

                                <div
                                    style={{
                                        height: 7,background:
                                            "#F0F0F0",
                                        borderRadius:
                                            100,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${Math.min(
                                                100,
                                                (challenge.progress /
                                                    challenge.total) *
                                                    100
                                            )}%`,
                                            height: "100%",
                                            borderRadius:
                                                100,
                                            background:
                                                "#4A4A6A",
                                            transition:
                                                "width .3s ease",
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}
// ─────────────────────────────────────────────
// PROFILE SCREEN
// ─────────────────────────────────────────────

function ProfileScreen({ profile, setProfile }) {
    const [editing, setEditing] =
        useState(false);

    const [heightFeet, setHeightFeet] =
        useState("");

    const [heightInches, setHeightInches] =
        useState("");

    const [form, setForm] = useState({
        name: profile?.name || "",
        email: profile?.email || "",
        age: profile?.age || "",
        height: profile?.height || "",
        weight: profile?.weight || "",
    });

    useEffect(() => {
        const heightCm = Number(profile?.height) || 0;
        if (heightCm > 0) {
            const totalInches = heightCm / 2.54;
            let feet = Math.floor(totalInches / 12);
            let inches = Math.round(totalInches % 12);
            if (inches === 12) {
                feet += 1;
                inches = 0;
            }
            setHeightFeet(String(feet));
            setHeightInches(String(inches));
        } else {
            setHeightFeet("");
            setHeightInches("");
        }

        setForm({
            name: profile?.name || "",
            email: profile?.email || "",
            age: profile?.age || "",
            height: profile?.height || "",
            weight: profile?.weight || "",
        });
    }, [profile]);

    const bmi = calcBMI(
        Number(form.weight),
        Number(form.height)
    );

    const bmiCategory =
        getBMICategory(Number(bmi));

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const saveProfile = async () => {
        try {
            const token =
                localStorage.getItem("accessToken") ||
                localStorage.getItem("token");

            if (!token) {
                alert("Login session expired. Please login again.");
                return;
            }

            const payload = {
                name: form.name.trim(),
                age: form.age ? Number(form.age) : undefined,
                height: form.height ? Number(form.height) : undefined,
                weight: form.weight ? Number(form.weight) : undefined,
            };

            const response = await fetch(
                "https://humanos-p8rl.onrender.com/api/profile",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                console.error("PROFILE SAVE FAILED:", result);
                alert(
                    result?.error?.message ||
                    "Unable to save your profile."
                );
                return;
            }

            const serverProfile =
                result.data || result.profile || {};

            const updatedProfile = {
                ...profile,
                name: serverProfile.name ?? form.name,
                email: serverProfile.email ?? form.email,
                age: serverProfile.age ?? form.age,
                height: serverProfile.height ?? form.height,
                weight: serverProfile.weight ?? form.weight,
            };

            setProfile(updatedProfile);
            localStorage.setItem(
                "humanos_user",
                JSON.stringify(updatedProfile)
            );
            setEditing(false);
        } catch (error) {
            console.error("PROFILE SAVE ERROR:", error);
            alert("Could not save your profile. Make sure the backend is running.");
        }
    };

    const logout = () => {
        localStorage.removeItem(
            "accessToken"
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "humanos_user"
        );

        window.location.reload();
    };

    const fieldStyle = {
        width: "100%",
        boxSizing: "border-box",
        border:
            "1.5px solid #EBEBF0",
        borderRadius: 12,
        padding: "11px 12px",
        fontSize: 13,
        outline: "none",
        background: "#fff",
        fontFamily:
            "'DM Sans',sans-serif",
    };

    return (
        <div
            style={{
                padding:
                    "16px 16px 30px",
            }}
        >
            <div
                style={{
                    fontFamily:
                        "'DM Serif Display',serif",
                    fontSize: 24,
                    color: "#1C1C1E",
                    marginBottom: 16,
                }}
            >
                My{" "}
                <span
                    style={{
                        color: "#4A4A6A",
                        fontStyle: "italic",
                    }}
                >
                    Profile
                </span>
            </div>

            {/* PROFILE HEADER */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#4A4A6A,#7C6A9A)",
                    borderRadius: 22,
                    padding: 22,
                    color: "#fff",
                    textAlign: "center",
                    marginBottom: 14,
                    boxShadow:
                        "0 8px 28px rgba(74,74,106,.25)",
                }}
            >
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius:
                            "50%",
                        background:
                            "rgba(255,255,255,.2)",
                        display: "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        margin:
                            "0 auto 10px",
                        fontSize: 34,
                    }}
                >
                    👤
                </div>

                <div
                    style={{
                        fontFamily:
                            "'DM Serif Display',serif",
                        fontSize: 24,
                    }}
                >
                    {profile?.name ||
                        "User"}
                </div>

                <div
                    style={{
                        fontSize: 12,
                        opacity: 0.75,
                        marginTop: 3,
                    }}
                >
                    {profile?.email ||
                        "No email available"}
                </div>
            </div>

            {/* PERSONAL INFORMATION */}

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "center",
                        marginBottom: 14,
                    }}
                >
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#1C1C1E",
                        }}
                    >
                        Personal Information
                    </div>

                    <button
                        onClick={() =>
                            editing
                                ? saveProfile()
                                : setEditing(
                                      true
                                  )
                        }
                        style={{
                            border: "none",
                            background:
                                editing
                                    ? "#10B981"
                                    : "#F5F3FF",
                            color:
                                editing
                                    ? "#fff"
                                    : "#4A4A6A",
                            borderRadius: 100,
                            padding:
                                "7px 13px",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "pointer",
                        }}
                    >
                        {editing
                            ? "Save"
                            : "Edit"}
                    </button>
                </div>

                {/* NAME */}

                <div
                    style={{
                        marginBottom: 12,
                    }}
                >
                    <label
                        style={{
                            display:
                                "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#8A8A9A",
                            marginBottom: 5,
                        }}
                    >
                        NAME
                    </label>

                    {editing ? (
                        <input
                            value={form.name}
                            onChange={(e) =>
                                updateField(
                                    "name",
                                    e.target
                                        .value
                                )
                            }
                            style={
                                fieldStyle
                            }
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#1C1C1E",
                            }}
                        >
                            {profile?.name ||
                                "Not provided"}
                        </div>
                    )}
                </div>

                {/* EMAIL */}

                <div
                    style={{
                        marginBottom: 12,
                    }}
                >
                    <label
                        style={{
                            display:
                                "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#8A8A9A",
                            marginBottom: 5,
                        }}
                    >
                        EMAIL
                    </label>

                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1C1C1E",
                        }}
                    >
                        {profile?.email ||
                            "Not provided"}
                    </div>
                </div>

                {/* AGE */}

                <div
                    style={{
                        marginBottom: 12,
                    }}
                >
                    <label
                        style={{
                            display:
                                "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#8A8A9A",
                            marginBottom: 5,
                        }}
                    >
                        AGE
                    </label>

                    {editing ? (
                        <input
                            type="number"
                            value={form.age}
                            onChange={(e) =>
                                updateField(
                                    "age",
                                    e.target
                                        .value
                                )
                            }
                            style={
                                fieldStyle
                            }
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#1C1C1E",
                            }}
                        >
                            {profile?.age ||
                                "Not provided"}
                        </div>
                    )}
                </div>

                {/* HEIGHT */}

                <div
                    style={{
                        marginBottom: 12,
                    }}
                >
                    <label
                        style={{
                            display:
                                "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#8A8A9A",
                            marginBottom: 5,
                        }}
                    >
                        HEIGHT (FT / IN)
                    </label>

                    {editing ? (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 10,
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: "#8A8A9A",
                                        marginBottom: 5,
                                    }}
                                >
                                    FEET
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    max="8"
                                    step="1"
                                    value={heightFeet}
                                    onChange={(e) => {
                                        const feet = e.target.value;
                                        setHeightFeet(feet);
                                        const cm =
                                            ((Number(feet) || 0) * 12 +
                                                (Number(heightInches) || 0)) *
                                            2.54;
                                        updateField("height", cm > 0 ? cm.toFixed(2) : "");
                                    }}
                                    style={fieldStyle}
                                />
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: "#8A8A9A",
                                        marginBottom: 5,
                                    }}
                                >
                                    INCHES
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    max="11"
                                    step="1"
                                    value={heightInches}
                                    onChange={(e) => {
                                        const inches = e.target.value;
                                        setHeightInches(inches);
                                        const cm =
                                            ((Number(heightFeet) || 0) * 12 +
                                                (Number(inches) || 0)) *
                                            2.54;
                                        updateField("height", cm > 0 ? cm.toFixed(2) : "");
                                    }}
                                    style={fieldStyle}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#1C1C1E",
                            }}
                        >
                            {profile?.height
                                ? (() => {
                                      const totalInches = Number(profile.height) / 2.54;
                                      const feet = Math.floor(totalInches / 12);
                                      const inches = Math.round(totalInches % 12);
                                      return `${feet} ft ${inches} in (${Number(profile.height).toFixed(1)} cm)`;
                                  })()
                                : "Not provided"}
                        </div>
                    )}
                </div>

                {/* WEIGHT */}

                <div>
                    <label
                        style={{
                            display:
                                "block",
                            fontSize: 10,
                            fontWeight: 700,
                            color: "#8A8A9A",
                            marginBottom: 5,
                        }}
                    >
                        WEIGHT (KG)
                    </label>

                    {editing ? (
                        <input
                            type="number"
                            value={
                                form.weight
                            }
                            onChange={(e) =>
                                updateField(
                                    "weight",
                                    e.target
                                        .value
                                )
                            }
                            style={
                                fieldStyle
                            }
                        />
                    ) : (
                        <div
                            style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#1C1C1E",
                            }}
                        >
                            {profile?.weight ||
                                "Not provided"}
                        </div>
                    )}
                </div>
            </div>

            {/* BMI */}

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 14,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 12,
                    }}
                >
                    Body Metrics
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems:
                            "center",
                        gap: 16,
                    }}
                >
                    <Ring
                        pct={Math.min(
                            100,
                            Number(bmi) * 3
                        )}
                        col={
                            bmiCategory.col
                        }
                        size={85}
                        stroke={8}
                    />

                    <div>
                        <div
                            style={{
                                fontSize: 12,
                                color: "#8A8A9A",
                            }}
                        >
                            BMI
                        </div>

                        <div
                            style={{
                                fontSize: 26,
                                fontWeight: 800,
                                color:
                                    bmiCategory.col,
                            }}
                        >
                            {bmi || "--"}
                        </div>

                        <div
                            style={{
                                display:
                                    "inline-block",
                                marginTop: 4,
                                background:
                                    `${bmiCategory.col}15`,
                                color:
                                    bmiCategory.col,
                                borderRadius:
                                    100,
                                padding:
                                    "4px 10px",
                                fontSize: 10,
                                fontWeight: 700,
                            }}
                        >
                            {
                                bmiCategory.label
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* ACCOUNT */}

            <div
                style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 20,
                    boxShadow:
                        "0 2px 12px rgba(0,0,0,.06)",
                }}
            >
                <div
                    style={{
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 12,
                    }}
                >
                    Account
                </div>

                <button
                    onClick={logout}
                    style={{
                        width: "100%",
                        border:
                            "1px solid #FECACA",
                        background:
                            "#FEF2F2",
                        color: "#DC2626",
                        borderRadius: 12,
                        padding: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                    }}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────

function Dashboard() {
    const [tab, setTab] =
        useState("home");

    const [mood, setMood] =
        useState("");

    const [water, setWater] =
        useState(0);

    const [
        challenges,
        setChallenges,
    ] = useState(
        INITIAL_CHALLENGES
    );

    const [profile, setProfile] =
        useState({
            name: "",
            email: "",
            age: "",
            height: "",
            weight: "",
        });
    
    useEffect(() => {
    if (!profile?.email) return;

    const savedChallenges = localStorage.getItem(
        `humanos_challenges_${profile.email.toLowerCase()}`
    );

    if (savedChallenges) {
        try {
            setChallenges(JSON.parse(savedChallenges));
        } catch (error) {
            console.error(
                "CHALLENGE LOAD ERROR:",
                error
            ); 
        }
    }
}, [profile?.email]);

    const [
        loadingProfile,
        setLoadingProfile,
    ] = useState(true);

    const [
        profileError,
        setProfileError,
    ] = useState("");

    const userStorageKey = profile?.email
        ? profile.email.toLowerCase()
        : "guest";

    useEffect(() => {
        if (!profile?.email) return;

        const savedWater = localStorage.getItem(
            `humanos_water_${userStorageKey}`
        );
        const savedMood = localStorage.getItem(
            `humanos_mood_${userStorageKey}`
        );

        setWater(
            savedWater !== null
                ? Math.max(0, Math.min(8, Number(savedWater)))
                : 0
        );
        setMood(savedMood || "");
    }, [profile?.email, userStorageKey]);

    useEffect(() => {
        if (!profile?.email) return;
        localStorage.setItem(
            `humanos_water_${userStorageKey}`,
            String(water)
        );
    }, [water, profile?.email, userStorageKey]);

    useEffect(() => {
        if (!profile?.email) return;
        localStorage.setItem(
            `humanos_mood_${userStorageKey}`,
            mood || ""
        );
    }, [mood, profile?.email, userStorageKey]);

    // ─────────────────────────────────────────
    // LOAD REAL LOGGED-IN USER
    // ─────────────────────────────────────────

    useEffect(() => {
        const loadProfile =
            async () => {
                try {
                    setLoadingProfile(
                        true
                    );
                    setProfileError(
                        ""
                    );

                    const token =
                        localStorage.getItem(
                            "accessToken"
                        ) ||
                        localStorage.getItem(
                            "token"
                        );

                    // Try saved local user first
                    let savedUser =
                        null;

                    try {
                        const stored =
                            localStorage.getItem(
                                "humanos_user"
                            );

                        if (stored) {
                            savedUser =
                                JSON.parse(
                                    stored
                                );
                        }
                    } catch (
                        storageError
                    ) {
                        console.error(
                            storageError
                        );
                    }

                    // If there is no token,
                    // use the saved login data.
                    if (!token) {
                        if (
                            savedUser
                        ) {
                            setProfile({
                                name:
                                    savedUser.name ||
                                    "",
                                email:
                                    savedUser.email ||
                                    "",
                                age:
                                    savedUser.age ||
                                    "",
                                height:
                                    savedUser.height ||
                                    "",
                                weight:
                                    savedUser.weight ||
                                    "",
                            });
                        }

                        return;
                    }

                   const response =
    await fetch(
        `https://humanos-p8rl.onrender.com/api/profile?t=${Date.now()}`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Content-Type":
                    "application/json",
            },
        }
    );


                    const result =
                        await response.json();

                    console.log(
                        "PROFILE RESPONSE:",
                        result
                    );

                    if (
                        response.ok &&
                        result.success
                    ) {
                       const data =
                        result?.data?.profile ||
                        result?.data ||
                        {};
                        const realProfile =
                            {
                                name:
                                    data.name ||
                                    savedUser?.name ||
                                    "",
                                email:
                                    data.email ||
                                    savedUser?.email ||
                                    "",
                                age:
                                    data.age ||
                                    savedUser?.age ||
                                    "",
                                height:
                                    data.height ||
                                    savedUser?.height ||
                                    "",
                                weight:
                                    data.weight ||
                                    savedUser?.weight ||
                                    "",
                            };

                        setProfile(
                            realProfile
                        );

                        localStorage.setItem(
                            "humanos_user",
                            JSON.stringify(
                                realProfile
                            )
                        );
                    } else if (
                        savedUser
                    ) {
                        setProfile({
                            name:
                                savedUser.name ||
                                "",
                            email:
                                savedUser.email ||
                                "",
                            age:
                                savedUser.age ||
                                "",
                            height:
                                savedUser.height ||
                                "",
                            weight:
                                savedUser.weight ||
                                "",
                        });
                    } else {
                        setProfileError(
                            "Unable to load your profile."
                        );
                    }
                } catch (error) {
                    console.error(
                        "PROFILE LOAD ERROR:",
                        error
                    );

                    setProfileError(
                        "Could not connect to the profile service."
                    );

                    try {
                        const stored =
                            localStorage.getItem(
                                "humanos_user"
                            );

                        if (stored) {
                            const user =
                                JSON.parse(
                                    stored
                                );

                            setProfile({
                                name:
                                    user.name ||
                                    "",
                                email:
                                    user.email ||
                                    "",
                                age:
                                    user.age ||
                                    "",
                                height:
                                    user.height ||
                                    "",
                                weight:
                                    user.weight ||
                                    "",
                            });
                        }
                    } catch (
                        storageError
                    ) {
                        console.error(
                            storageError
                        );
                    }
                } finally {
                    setLoadingProfile(
                        false
                    );
                }
            };

        loadProfile();
    }, []);

    // ─────────────────────────────────────────
    // UPDATE PROFILE
    // ─────────────────────────────────────────

    const updateProfile = (
        updatedProfile
    ) => {
        setProfile(
            updatedProfile
        );

        localStorage.setItem(
            "humanos_user",
            JSON.stringify(
                updatedProfile
            )
        );
    };

    // ─────────────────────────────────────────
    // LOADING
    // ─────────────────────────────────────────

    if (loadingProfile) {
        return (
            <div
                style={{
                    minHeight:
                        "100vh",
                    maxWidth: 430,
                    margin:
                        "0 auto",
                    background:
                        "#F9F8F6",
                    display: "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    flexDirection:
                        "column",
                    fontFamily:
                        "'DM Sans',sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 42,
                        marginBottom: 12,
                    }}
                >
                    🌿
                </div>

                <div
                    style={{
                        fontFamily:
                            "'DM Serif Display',serif",
                        fontSize: 24,
                        color: "#4A4A6A",
                    }}
                >
                    HumanOS
                </div>

                <div
                    style={{
                        marginTop: 6,
                        fontSize: 12,
                        color: "#8A8A9A",
                    }}
                >
                    Loading your profile...
                </div>
            </div>
        );
    }

    const safeProfile =
        profile || {
            name: "",
            email: "",
            age: "",
            height: "",
            weight: "",
        };

    const screens = {
       home: (
    <HomeScreen
        profile={safeProfile}
        water={water}
        setWater={setWater}
        mood={mood}
        challenges={challenges}
        setChallenges={setChallenges}
    />
),

        diet: (
            <DietScreen
                profile={
                    safeProfile
                }
            />
        ),

        wellness: (
            <WellnessScreen
                mood={mood}
                setMood={
                    setMood
                }
            />
        ),

        activity: (
    <ActivityScreen
        challenges={
            challenges
        }
        setChallenges={
            setChallenges
        }
        profile={
            profile
        }
    />
),
        profile: (
            <ProfileScreen
                profile={
                    safeProfile
                }
                setProfile={
                    updateProfile
                }
            />
        ),
    };

    return (
        <div
            style={{
                maxWidth: 430,
                margin: "0 auto",
                minHeight:
                    "100vh",
                background:
                    "#F9F8F6",
                fontFamily:
                    "'DM Sans',sans-serif",
                paddingBottom: 90,
                position:
                    "relative",
            }}
        >
            {/* TOP ACCENT */}

            <div
                style={{
                    width: "100%",
                    height: 3,
                    background:
                        "linear-gradient(90deg,#C4B8E8,#F5C5A8,#C4B8E8)",
                    position:
                        "sticky",
                    top: 0,
                    zIndex: 100,
                }}
            />

            {/* HEADER */}

            <div
                style={{
                    padding:
                        "12px 20px",
                    display:
                        "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "space-between",
                    background:
                        "#fff",
                    borderBottom:
                        "1px solid #EBEBF0",
                    position:
                        "sticky",
                    top: 3,
                    zIndex: 99,
                }}
            >
                <div
                    style={{
                        fontFamily:
                            "'DM Serif Display',serif",
                        fontSize: 22,
                        color: "#4A4A6A",
                        fontStyle:
                            "italic",
                    }}
                >
                    HumanOS
                </div>

                <div
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap: 8,
                    }}
                >
                    <button
                       onClick={() => {
    alert(
        "🌿 HumanOS Notifications\n\n" +
        "💧 Stay hydrated — keep drinking water!\n" +
        "🏃 Keep moving — log your daily activity.\n" +
        "🎯 Check your active challenges.\n" +
        "🧘 Take a moment for your wellness."
    );
}}
                        title="Notifications"
                        style={{
                            border: "none",
                            background: "transparent",
                            fontSize: 20,
                            cursor: "pointer",
                            padding: 4,
                        }}
                    >
                        🔔
                    </button>

                    <button
                        onClick={() => setTab("profile")}
                        title="Profile"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            border: "none",
                            background: "linear-gradient(135deg,#C4B8E8,#4A4A6A)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                            cursor: "pointer",
                        }}
                    >
                        👤
                    </button>
                </div>
            </div>

            {/* PROFILE ERROR */}

            {profileError && (
                <div
                    style={{
                        margin:
                            "10px 16px 0",
                        padding:
                            "9px 12px",
                        borderRadius: 12,
                        background:
                            "#FEF2F2",
                        border:
                            "1px solid #FECACA",
                        color:
                            "#B91C1C",
                        fontSize: 11,
                        fontWeight: 600,
                    }}
                >
                    ⚠️{" "}
                    {profileError}
                </div>
            )}

            {/* SCREEN */}

            {screens[tab]}

            {/* BOTTOM NAVIGATION */}

            <div
                style={{
                    position:
                        "fixed",
                    bottom: 0,
                    left: "50%",
                    transform:
                        "translateX(-50%)",
                    width: "100%",
                    maxWidth: 430,
                    background:
                        "#fff",
                    borderTop:
                        "1px solid #EBEBF0",
                    display:
                        "flex",
                    padding:
                        "8px 0 12px",
                    boxShadow:
                        "0 -4px 20px rgba(0,0,0,.08)",
                    zIndex: 100,
                }}
            >
                {NAV.map((item) => (
                    <button
                        key={item.id}
                        onClick={() =>
                            setTab(
                                item.id
                            )
                        }
                        style={{
                            flex: 1,
                            display:
                                "flex",
                            flexDirection:
                                "column",
                            alignItems:
                                "center",
                            gap: 2,
                            border:
                                "none",
                            background:
                                "transparent",
                            cursor:
                                "pointer",
                            padding:
                                "4px 0",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                filter:
                                    tab ===
                                    item.id
                                        ? "none"
                                        : "grayscale(1)",
                                opacity:
                                    tab ===
                                    item.id
                                        ? 1
                                        : 0.5,
                            }}
                        >
                            {
                                item.icon
                            }
                        </div>

                        <div
                            style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color:
                                    tab ===
                                    item.id
                                        ? "#4A4A6A"
                                        : "#8A8A9A",
                            }}
                        >
                            {
                                item.label
                            }
                        </div>

                        {tab ===
                            item.id && (
                            <div
                                style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius:
                                        "50%",
                                    background:
                                        "#4A4A6A",
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
    const [screen, setScreen] =
        useState("getstarted");

    if (
        screen ===
        "getstarted"
    ) {
        return (
            <GetStarted
                onDone={() =>
                    setScreen(
                        "login"
                    )
                }
            />
        );
    }

    if (
        screen === "login"
    ) {
        return (
            <LoginPage
                onLogin={() =>
                    setScreen(
                        "dashboard"
                    )
                }
            />
        );
    }

    return <Dashboard />;
}