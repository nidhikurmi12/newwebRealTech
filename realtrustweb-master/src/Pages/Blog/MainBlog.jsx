import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import Request from "../../lib/axios";
import api from "../../config/api.conf";
import BLogList from "./blogsList";
const MainBlog = () => {
  const [blogs, setBlogs] = useState([]);
  
  const allPosts = async () => {
    try {
      const result = await Request.get(api.blogPosts);
      console.log(result.data.posts);
      setBlogs(result.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <div className="lg:mt-24 pl-[10px] pr-[10px]">
      <div className="flex flex-col md:flex-col lg:flex-row gap-6 lg:p-6 pl-0 pr-0 py-6 mt-16">
        <div className="w-full md:w-full lg:w-[70%]">
          <Blog blogs={blogs} />
        </div>
        <div className="w-full md:w-full mt-2 lg:w-[30%] max-h-[410px] overflow-y-scroll scrollbar-hide">
          <BLogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
};

export default MainBlog;