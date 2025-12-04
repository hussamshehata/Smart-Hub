import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/UserSlice.js";
import { Button } from "@/Components/ui/button.jsx";
import { login as loginService } from "@/services/authService.js";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const validateInputs = () => {
        if (!email || !password) {
            setErrorMessage("Please fill in all fields");
            return false;
        }
        if (!email.includes("@")) {
            setErrorMessage("Invalid email format");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        if (!validateInputs()) return;

        try {
            setLoading(true);

            // Call backend
            const data = await loginService(email.trim(), password.trim());


            // Choose storage
            if (rememberMe) {
                localStorage.setItem("token", data.token);
            } else {
                sessionStorage.setItem("token", data.token);
            }

            // Save full user info in Redux
            dispatch(login(data.user));

            // Redirect based on user role
            if (data.user.role === "admin") {
                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h1>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-3">{errorMessage}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                                placeholder="Enter your password"
                            />
                            <span
                                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label className="text-sm text-gray-600">Remember me</label>
                    </div>

                    {/* Submit */}
                    <Button className="w-full mt-4" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>

                </form>
            </motion.div>
        </motion.div>
    );
}
