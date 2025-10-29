import React from "react";
import BlogCard from "./BlogCard";

const BlogList = () => {
    const blogs = [
        {
            image:
                "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=900&q=80",
            title: "7 ways to decor your home like a professional",
            date: "October 19, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=900&q=80",
            title: "Inside a beautiful kitchen organization",
            date: "October 18, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
            title: "Decor your bedroom for your children",
            date: "October 16, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1600607687920-4e3b3e0d09c8?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1598300186201-494e0c7c7b3f?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1616486029485-3f7e0a4c5f79?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1616596874497-cd39e2b08d67?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1618221516305-31a5c7c9af93?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
        {
            image:
                "https://images.unsplash.com/photo-1628748312259-c6b3d381b0c2?auto=format&fit=crop&w=900&q=80",
            title:
                "Modern texas home is beautiful and completely kid-friendly",
            date: "October 14, 2023",
        },
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                    <BlogCard
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