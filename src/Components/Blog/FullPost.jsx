import imge from '../../assets/images/Lifestyle-Innovators.jpg'

export default function FullPost() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-10">

            <h1 className="text-3xl font-semibold leading-snug">
                Smarter Living Powered
            </h1>

            <div className="flex items-center gap-3 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <span>Samsung Developer</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400" />
                <span>Apr 17, 2025</span>
            </div>

            {/* ─── IMAGE ─── */}
            <div className="mt-5">
                <img
                    src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80"
                    alt=""
                    className="w-full h-auto rounded-lg object-cover"
                />
            </div>

            {/* ─── TEXT BLOCK ─── */}
            <p className="text-gray-700 mt-8 leading-relaxed">
                Modern wearable technology has taken a major leap over the past decade.
                Once limited to step counting and basic notifications, devices like smartwatches,
                fitness bands, and wireless earbuds now support advanced health tracking,
                biometric authentication, and seamless mobile connectivity.

                Wearables are now capable of monitoring key metrics such as heart rate,
                sleep patterns, blood oxygen levels, and stress levels with high accuracy.
                Paired with smartphones, these devices help users take control of their
                well-being without needing specialized equipment. The key challenge, however,
                lies in unifying data from various devices and platforms.

                Samsung has built one of the most complete wearable ecosystems, enabling real-time
                data sharing across smartphones, tablets, smartwatches, and health apps. With
                powerful AI-based insights and continuous monitoring, users can track trends,
                prevent health issues, and make informed lifestyle changes.

                The future of wearable health technology lies in smarter sensors, deeper
                analytics, and tighter integration with providers. Samsung’s platform enables
                collaboration between developers, device manufacturers, and healthcare systems,
                helping transform personal technology into actionable health insight.

                With improved accessibility and precision, wearables are reshaping how people
                interact with their health every day—offering a more personalized, proactive, and
                connected healthcare experience.
            </p>


            {/* ───── Suggestions ───── */}
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4">You might also like</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Suggestion card */}

                    <div

                        className="rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
                            alt="suggest"
                            className="w-full object-cover h-48"
                        />
                        <p className="text-sm mt-2 font-medium">
                            Best headphones of 2025 for music lovers
                        </p>
                        <span className="text-xs text-gray-500">5 min read</span>
                    </div>
                    <div

                        className="rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"
                            alt="suggest"
                            className="w-full object-cover h-48"
                        />
                        <p className="text-sm mt-2 font-medium">
                            Top smartwatch brands for health tracking
                        </p>
                        <span className="text-xs text-gray-500">5 min read</span>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
                            alt="suggest"
                            className="w-full object-cover h-48"
                        />
                        <p className="text-sm mt-2 font-medium">
                            How to improve battery life on your phone
                        </p>
                        <span className="text-xs text-gray-500">5 min read</span>
                    </div>
                </div>

                <button className="text-sm mt-3 font-medium text-gray-500 hover:text-black underline">
                    More Articles →
                </button>
            </div>
        </div>
    );

}