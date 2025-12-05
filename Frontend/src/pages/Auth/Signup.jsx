import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/UserSlice.js";
import { Button } from "../../Components/ui/button.jsx";
import { register as registerService } from "../../services/authService.js";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // to show errors

    const handleRegister = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name || !email || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        try {
            const data = await registerService(name, email, password);

            // Save token
            localStorage.setItem("token", data.token);

            // Save user in Redux
            dispatch(login({ email: data.user.email, name: data.user.name }));

            // Redirect
            navigate("/");
        } catch (error) {
            // Show exact backend error if available
            const msg =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed";
            setErrorMessage(msg);
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
                    Register
                </h1>

                {errorMessage && (
                    <div className="mb-4 text-red-600 text-sm">{errorMessage}</div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
                            placeholder="Enter your full name"
                        />
                    </div>

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
                        Register
                    </Button>
                </form>
            </motion.div>
        </motion.div>
    );
}
