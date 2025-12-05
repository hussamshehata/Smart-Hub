import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar&Footer/Navbar.jsx";
import Footer from "../Components/Navbar&Footer/Footer.jsx";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background text-foreground">
                <Outlet /> {/* This is where pages will appear */}
            </main>
            <Footer />
        </>
    );
}
