import { useState } from "react";

const API_BASE = "http://localhost:5000";

export default function LoginPage({ onLogin }) {
    const [mode, setMode] = useState("login");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isSignup = mode === "signup";

    // =========================================================
    // LOGIN
    // =========================================================

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_BASE}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: cleanEmail,
                        password: password,
                    }),
                }
            );

            const result = await response.json();

            console.log("LOGIN RESPONSE:", result);

            if (!response.ok || !result.success) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    "Invalid email or password.";

                throw new Error(message);
            }

            const data = result.data || result;

            const accessToken = data.accessToken;
            const user = data.user;

            if (!accessToken) {
                throw new Error(
                    "Login succeeded, but no access token was returned."
                );
            }

            // Save JWT
            localStorage.setItem(
                "accessToken",
                accessToken
            );

            // Compatibility token
            localStorage.setItem(
                "token",
                accessToken
            );

            // Save user
            if (user) {
                localStorage.setItem(
                    "humanos_user",
                    JSON.stringify(user)
                );
            }

            console.log(
                "LOGIN SUCCESS - TOKEN SAVED"
            );

            onLogin();

        } catch (err) {
            console.error(
                "LOGIN ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to login. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // SIGN UP
    // =========================================================

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanName) {
            setError("Please enter your name.");
            return;
        }

        if (!cleanEmail) {
            setError("Please enter your email.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must contain at least 8 characters."
            );
            return;
        }

        if (!/[A-Za-z]/.test(password)) {
            setError(
                "Password must contain at least one letter."
            );
            return;
        }

        if (!/[0-9]/.test(password)) {
            setError(
                "Password must contain at least one number."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_BASE}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: cleanName,
                        email: cleanEmail,
                        password: password,
                    }),
                }
            );

            const result = await response.json();

            console.log(
                "REGISTER RESPONSE:",
                result
            );

            if (!response.ok || !result.success) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    "Unable to create account.";

                throw new Error(message);
            }

            const data = result.data || result;

            const accessToken =
                data.accessToken;

            const user =
                data.user;

            // If backend returns token after registration
            if (accessToken) {
                localStorage.setItem(
                    "accessToken",
                    accessToken
                );

                localStorage.setItem(
                    "token",
                    accessToken
                );
            }

            if (user) {
                localStorage.setItem(
                    "humanos_user",
                    JSON.stringify(user)
                );
            }

            setSuccess(
                "Account created successfully!"
            );

            // Automatically enter dashboard
            if (accessToken) {
                setTimeout(() => {
                    onLogin();
                }, 500);
            } else {
                // Otherwise switch to login
                setTimeout(() => {
                    setMode("login");
                    setPassword("");
                    setSuccess("");
                }, 1200);
            }

        } catch (err) {
            console.error(
                "SIGNUP ERROR:",
                err
            );

            setError(
                err.message ||
                "Unable to create account."
            );
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // SWITCH LOGIN / SIGNUP
    // =========================================================

    const switchMode = () => {
        setMode(
            isSignup
                ? "login"
                : "signup"
        );

        setName("");
        setEmail("");
        setPassword("");

        setError("");
        setSuccess("");

        setShowPass(false);
    };

    // =========================================================
    // GOOGLE
    // =========================================================

    const handleGoogleLogin = () => {
        setError(
            "Google login is not connected yet. Email login and Sign Up are available."
        );
    };

    // =========================================================
    // FACEBOOK
    // =========================================================

    const handleFacebookLogin = () => {
        setError(
            "Facebook login is not connected yet. Email login and Sign Up are available."
        );
    };

    // =========================================================
    // FORGOT PASSWORD
    // =========================================================

    const handleForgotPassword = () => {
        setError(
            "Password reset is not configured yet."
        );
    };

    // =========================================================
    // UI
    // =========================================================

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#F9F8F6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: "'DM Sans',sans-serif",
                maxWidth: 430,
                margin: "0 auto",
            }}
        >

            {/* Accent stripe */}
            <div
                style={{
                    width: "100%",
                    height: 3,
                    background:
                        "linear-gradient(90deg,#C4B8E8,#F5C5A8,#C4B8E8)",
                }}
            />

            {/* Header */}
            <div
                style={{
                    width: "100%",
                    padding: "12px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#fff",
                    borderBottom:
                        "1px solid #EBEBF0",
                }}
            >
                <div
                    style={{
                        fontFamily:
                            "'DM Serif Display',serif",
                        fontSize: 22,
                        color: "#4A4A6A",
                        fontStyle: "italic",
                    }}
                >
                    HumanOS
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#22C55E",
                        }}
                    />

                    <span
                        style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#8A8A9A",
                        }}
                    >
                        Active
                    </span>
                </div>
            </div>

            {/* Hero */}
            <div
                style={{
                    width: "100%",
                    background:
                        "linear-gradient(145deg,#F5F3FF,#EDE9FE)",
                    padding: "40px 20px 36px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom:
                        "1px solid #EBEBF0",
                }}
            >

                <div
                    style={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        background:
                            "rgba(255,255,255,.5)",
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        bottom: -40,
                        left: -40,
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        background:
                            "rgba(255,255,255,.35)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: 140,
                            height: 140,
                            borderRadius: "50%",
                            background:
                                "rgba(255,255,255,.6)",
                            border:
                                "3px solid rgba(255,255,255,.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow:
                                "0 0 0 16px rgba(255,255,255,.2)",
                        }}
                    >
                        <div
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: "50%",
                                background:
                                    "rgba(255,255,255,.7)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 52,
                            }}
                        >
                            🌿
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        marginTop: 16,
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            fontFamily:
                                "'DM Serif Display',serif",
                            fontSize: 20,
                            color: "#4A4A6A",
                        }}
                    >
                        Your wellness journey
                    </div>

                    <div
                        style={{
                            fontSize: 13,
                            color: "#8A8A9A",
                            marginTop: 4,
                            fontWeight: 500,
                        }}
                    >
                        continues here 💜
                    </div>
                </div>
            </div>

            {/* Form */}
            <form
                onSubmit={
                    isSignup
                        ? handleSignup
                        : handleLogin
                }
                style={{
                    width: "calc(100% - 32px)",
                    margin: "16px 16px 0",
                    background: "#fff",
                    borderRadius: 28,
                    padding: "26px 22px 28px",
                    boxShadow:
                        "0 2px 20px rgba(0,0,0,.06)",
                }}
            >

                {/* Chip */}
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "#EDE9FE",
                        color: "#7C3AED",
                        borderRadius: 100,
                        padding: "5px 14px",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: ".07em",
                        textTransform: "uppercase",
                        marginBottom: 14,
                    }}
                >
                    {isSignup
                        ? "✨ CREATE ACCOUNT"
                        : "👋 WELCOME BACK"}
                </div>

                {/* Title */}
                <div
                    style={{
                        marginBottom: 6,
                    }}
                >
                    <span
                        style={{
                            fontFamily:
                                "'DM Serif Display',serif",
                            fontSize: 28,
                            color: "#1C1C1E",
                        }}
                    >
                        {isSignup
                            ? "Join "
                            : "Welcome "}
                    </span>

                    <span
                        style={{
                            fontFamily:
                                "'DM Serif Display',serif",
                            fontSize: 28,
                            color: "#7C3AED",
                            fontStyle: "italic",
                        }}
                    >
                        {isSignup
                            ? "HumanOS!"
                            : "back!"}
                    </span>
                </div>

                <div
                    style={{
                        fontSize: 14,
                        color: "#8A8A9A",
                        marginBottom: 22,
                        lineHeight: 1.6,
                    }}
                >
                    {isSignup
                        ? "Create your account and start your wellness journey."
                        : "Sign in to continue your lifestyle journey"}
                </div>

                {/* Error */}
                {error && (
                    <div
                        style={{
                            background: "#FEF2F2",
                            border:
                                "1px solid #FECACA",
                            color: "#B91C1C",
                            borderRadius: 14,
                            padding: "11px 13px",
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 14,
                            lineHeight: 1.5,
                        }}
                    >
                        ⚠️ {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div
                        style={{
                            background: "#F0FDF4",
                            border:
                                "1px solid #BBF7D0",
                            color: "#15803D",
                            borderRadius: 14,
                            padding: "11px 13px",
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 14,
                        }}
                    >
                        ✓ {success}
                    </div>
                )}

                {/* Name - Signup */}
                {isSignup && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            background: "#F9F8F6",
                            border:
                                "1.5px solid #EBEBF0",
                            borderRadius: 16,
                            padding: "14px 18px",
                            marginBottom: 12,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 18,
                            }}
                        >
                            👤
                        </span>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            autoComplete="name"
                            style={{
                                border: "none",
                                background: "none",
                                outline: "none",
                                fontSize: 15,
                                color: "#1C1C1E",
                                fontWeight: 500,
                                flex: 1,
                                fontFamily:
                                    "'DM Sans',sans-serif",
                            }}
                        />
                    </div>
                )}

                {/* Email */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "#F9F8F6",
                        border:
                            "1.5px solid #EBEBF0",
                        borderRadius: 16,
                        padding: "14px 18px",
                        marginBottom: 12,
                    }}
                >
                    <span
                        style={{
                            fontSize: 18,
                        }}
                    >
                        📧
                    </span>

                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        autoComplete="email"
                        style={{
                            border: "none",
                            background: "none",
                            outline: "none",
                            fontSize: 15,
                            color: "#1C1C1E",
                            fontWeight: 500,
                            flex: 1,
                            fontFamily:
                                "'DM Sans',sans-serif",
                        }}
                    />
                </div>

                {/* Password */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "#F9F8F6",
                        border:
                            "1.5px solid #EBEBF0",
                        borderRadius: 16,
                        padding: "14px 18px",
                        marginBottom: 18,
                    }}
                >
                    <span
                        style={{
                            fontSize: 18,
                        }}
                    >
                        🔒
                    </span>

                    <input
                        type={
                            showPass
                                ? "text"
                                : "password"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        autoComplete={
                            isSignup
                                ? "new-password"
                                : "current-password"
                        }
                        style={{
                            border: "none",
                            background: "none",
                            outline: "none",
                            fontSize: 15,
                            color: "#1C1C1E",
                            fontWeight: 500,
                            flex: 1,
                            fontFamily:
                                "'DM Sans',sans-serif",
                        }}
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPass(
                                (s) => !s
                            )
                        }
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                    >
                        {showPass
                            ? "🙈"
                            : "👁️"}
                    </button>
                </div>

                {/* Remember / Forgot */}
                {!isSignup && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent:
                                "space-between",
                            marginBottom: 22,
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems:
                                    "center",
                                gap: 8,
                                cursor: "pointer",
                                fontSize: 14,
                                color: "#1C1C1E",
                                fontWeight: 500,
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) =>
                                    setRemember(
                                        e.target.checked
                                    )
                                }
                                style={{
                                    width: 18,
                                    height: 18,
                                    accentColor:
                                        "#7C3AED",
                                    cursor:
                                        "pointer",
                                }}
                            />

                            Remember me
                        </label>

                        <button
                            type="button"
                            onClick={
                                handleForgotPassword
                            }
                            style={{
                                background: "none",
                                border: "none",
                                color: "#7C3AED",
                                fontWeight: 700,
                                fontSize: 14,
                                cursor: "pointer",
                                fontFamily:
                                    "'DM Sans',sans-serif",
                            }}
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                {/* Main button */}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        background:
                            loading
                                ? "#8A8AA0"
                                : "#4A4A6A",
                        border: "none",
                        borderRadius: 100,
                        padding: "15px 28px",
                        color: "#fff",
                        fontSize: 16,
                        fontWeight: 700,
                        cursor:
                            loading
                                ? "not-allowed"
                                : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "center",
                        gap: 12,
                        boxShadow:
                            "0 6px 20px rgba(74,74,106,.28)",
                        marginBottom: 16,
                        fontFamily:
                            "'DM Sans',sans-serif",
                        opacity:
                            loading ? 0.8 : 1,
                    }}
                >
                    {loading
                        ? isSignup
                            ? "Creating account..."
                            : "Logging in..."
                        : isSignup
                            ? "Create Account"
                            : "Log In"}

                    {!loading && (
                        <div
                            style={{
                                width: 34,
                                height: 34,
                                borderRadius: "50%",
                                background:
                                    "rgba(255,255,255,.18)",
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                fontSize: 18,
                            }}
                        >
                            →
                        </div>
                    )}
                </button>

                {/* Divider */}
                <div
                    style={{
                        textAlign: "center",
                        position: "relative",
                        marginBottom: 16,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            right: 0,
                            height: 1,
                            background:
                                "#EBEBF0",
                        }}
                    />

                    <span
                        style={{
                            position: "relative",
                            background: "#fff",
                            padding: "0 14px",
                            fontSize: 13,
                            color: "#8A8A9A",
                            fontWeight: 500,
                        }}
                    >
                        or continue with
                    </span>
                </div>

                {/* Google / Facebook */}
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        marginBottom: 20,
                    }}
                >
                    <button
                        type="button"
                        onClick={
                            handleGoogleLogin
                        }
                        style={{
                            flex: 1,
                            padding: "13px",
                            background:
                                "#F9F8F6",
                            border:
                                "1.5px solid #EBEBF0",
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1C1C1E",
                            cursor: "pointer",
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            gap: 8,
                            fontFamily:
                                "'DM Sans',sans-serif",
                        }}
                    >
                        🔴 Google
                    </button>

                    <button
                        type="button"
                        onClick={
                            handleFacebookLogin
                        }
                        style={{
                            flex: 1,
                            padding: "13px",
                            background:
                                "#F9F8F6",
                            border:
                                "1.5px solid #EBEBF0",
                            borderRadius: 16,
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1C1C1E",
                            cursor: "pointer",
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            gap: 8,
                            fontFamily:
                                "'DM Sans',sans-serif",
                        }}
                    >
                        🔵 Facebook
                    </button>
                </div>

                {/* Login / Signup switch */}
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 13,
                        color: "#8A8A9A",
                        fontWeight: 500,
                    }}
                >
                    {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}

                    {" "}

                    <button
                        type="button"
                        onClick={switchMode}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#4A4A6A",
                            fontWeight: 800,
                            cursor: "pointer",
                            fontSize: 13,
                            fontFamily:
                                "'DM Sans',sans-serif",
                            padding: "8px 6px",
                            position: "relative",
                            zIndex: 10,
                        }}
                    >
                        {isSignup
                            ? "Log In"
                            : "Sign Up"}
                    </button>
                </div>
            </form>

            <div
                style={{
                    height: 24,
                }}
            />
        </div>
    );
}