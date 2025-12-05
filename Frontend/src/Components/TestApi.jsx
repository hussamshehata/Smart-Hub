import { useEffect } from "react";
import { login } from "../services/authService.js"; // your auth service
import api from "../services/api.js"; // Axios instance

export default function TestApi() {
    useEffect(() => {
        // 1️⃣ Test simple Axios GET request
        api.get("/test")
            .then(res => console.log("API GET /test response:", res.data))
            .catch(err => console.log("API GET /test error:", err));

        // 2️⃣ Test login
        login("test@test.com", "123456")
            .then(res => {
                console.log("Login successful:", res);
                localStorage.setItem("token", res.token); // optional, test storing token
            })
            .catch(err => console.log("Login error:", err));
    }, []);

    return (
        <div className="p-4 text-center bg-gray-100 rounded-lg">
            Open console to see API & Login test results
        </div>
    );
}
