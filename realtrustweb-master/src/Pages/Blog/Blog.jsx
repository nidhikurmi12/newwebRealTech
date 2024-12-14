import React, { useState } from "react";
const placeholderImage = "https://via.placeholder.com/200";
const Blog = ({ blogs }) => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const toggleReadMore = (index) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <div className="py-3">
      {blogs.map((post, index) => {
        const isExpanded = expandedPosts[index];
        return (
          <div
            key={index}
            className="mb-12 flex flex-col justify-center items-center border-b-[.5px]  border-gray-800 pb-3"
          >
            <div className="flex justify-center mb-6">
              {post.image_url ? (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-[800px] h-[400px] object-cover rounded-lg shadow-lg"
                />
              ) : (
                <p>Image not available</p>
              )}
            </div>
            <div className="flex flex-col w-full md:w-full lg:w-[800px]  items-start">
              <div className="flex gap-3 items-start">
                <img
                  src={
                    post.author?.image ? post.author.image : placeholderImage
                  }
                  alt="Author"
                  className="h-10 w-10 rounded-full border mt-2"
                  onError={(e) => (e.target.src = placeholderImage)}
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                  {new Date(post.created_at).toLocaleString()} | By {post.author.name}
                  </p>
                  <p className="text-gray-800 text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <p
                className={`text-gray-800 text-base leading-relaxed mb-6 ${
                  isExpanded ? "" : "line-clamp-4"
                }`}
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
                dangerouslySetInnerHTML={{ __html: post.body }}
              ></p>
              <button
                onClick={() => toggleReadMore(index)}
                className="py-2 px-4 bg-yellow-500 text-white border-2 border-yellow-500 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;