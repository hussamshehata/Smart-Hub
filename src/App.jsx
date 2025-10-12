import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts.jsx";
import Home from "./pages/Home";


function App() {
    return (
        <Routes>
            {/* Layout Route */}
            <Route path="/" element={<MainLayout />}>
                {/* Child Routes (inside layout) */}
                <Route index element={<Home />} />

            </Route>
        </Routes>
    );
}

export default App;
