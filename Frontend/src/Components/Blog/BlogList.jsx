import React from "react";
import BlogPost from "./BlogPost.jsx";

const BlogList = () => {
    const blogs = [
        {
            image:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
            title: "Top 7 flagship smartphones of 2025 you must try",
            date: "October 19, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
            title: "Best wireless headphones for noise cancellation",
            date: "October 18, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1518444022911-88f7fdb828a6?auto=format&fit=crop&w=900&q=80",
            title: "Smartwatch fitness features: What you need to know",
            date: "October 16, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1605451235992-e5f96f9483cf?auto=format&fit=crop&w=900&q=80",
            title: "How to pick the perfect smartphone camera",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=80",
            title: "Top gaming smartphones under $500",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1511715281313-95591a1cc68e?auto=format&fit=crop&w=900&q=80",
            title: "Wireless earbuds vs headphones—Which should you buy?",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
            title: "Top smartwatch brands for health tracking",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
            title: "How to improve battery life on your phone",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
            title: "Best headphones of 2025 for music lovers",
            date: "October 14, 2023",
        },
    ];

    return (
        <section className="sm:px-8 md:mx-[4rem] lg:mx-[7rem] py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <BlogPost
                        key={index}
                        image={blog.image}
                        title={blog.title}
                        date={blog.date}
                    />
                ))}
            </div>

        </section>
    );
};

export default BlogList;