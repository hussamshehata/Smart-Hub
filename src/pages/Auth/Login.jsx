import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/UserSlice.js";
import { Button } from "@/Components/ui/button.jsx";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state for form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Simulated login handler
    const handleLogin = (e) => {
        e.preventDefault();

        // Example of "fake" auth for now (we’ll later replace this with real auth)
        if (email && password) {
            const userData = { email };
            dispatch(login(userData)); // store in Redux
            navigate("/dashboard"); // redirect to admin dashboard
        } else {
            alert("Please fill in all fields");
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

                <form onSubmit={handleLogin} className="space-y-4">
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

                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        Sign In
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    );
}
