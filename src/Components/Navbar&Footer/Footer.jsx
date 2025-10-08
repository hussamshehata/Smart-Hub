export default function Footer() {
    return (
        <footer className="bg-[#111] text-gray-300 py-10 px-6 md:px-16">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-700 pb-6">
                {/* Left Side */}
                <div className="flex items-center gap-4">
                    <h1 className="text-white font-semibold text-xl">Smart Hub</h1>
                    <span className="text-gray-400 text-sm">Electronics Store</span>
                </div>

                {/* Navigation */}
                <ul className="flex flex-wrap gap-6 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Product</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                </ul>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-4">
                {/* Copyright */}
                <p className="text-xs text-gray-500">
                    Copyright © 2025 Smart hub. All rights reserved
                </p>

                {/* Policies */}
                <div className="flex items-center gap-6 text-sm">
                    <a href="#" className="hover:text-white font-medium transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white font-medium transition-colors">Terms of Use</a>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-4 text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">
                        <i className="ri-instagram-line text-lg"></i>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <i className="ri-facebook-fill text-lg"></i>
                    </a>
                    <a href="#" className="hover:text-white transition-colors">
                        <i className="ri-youtube-fill text-lg"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
