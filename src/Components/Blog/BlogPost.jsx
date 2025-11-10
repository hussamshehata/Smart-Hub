import React from "react";

const BlogPost = ({ image, title, date }) => {
    return (
        <div className="flex flex-col">
            <img
                src={image}
                alt={title}
                className="mb-4 object-cover w-full h-56"
            />
            <h3 className="font-medium text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{date}</p>
        </div>
    );
};

export default BlogPost;