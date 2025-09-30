function Header() {
    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-gray-900 text-white text-sm text-center py-2">
                ✨ Free shipping on orders over $50
            </div>

            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    {/* Logo */}
                    <a href="#" className="text-xl font-bold text-blue-600">SmartHub</a>

                    {/* Links */}
                    <div className="space-x-6 hidden md:flex">
                        <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Blog</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Contact us</a>
                    </div>

                    {/* Button */}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Sign in
                    </button>
                </div>
            </nav>
        </>
    );
}

export default Header;
