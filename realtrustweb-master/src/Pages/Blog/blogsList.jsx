import React from "react";

const BLogList = ({ blogs }) => {
  console.log(blogs);

  return (
    <>
      <div className="w-full p-4 rounded-md bg-gray-300 shadow-md ">
        <h1 className="text-xl font-semibold mb-4">Latest Blogs ...</h1>
        <div className="space-y-4">
          {blogs &&
            blogs.map((ele, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-900 p-2 rounded-md hover:cursor-pointer"
                >
                  {ele.image_url ? (
                    <img
                      src={ele.image_url}
                      alt={ele.title}
                      className="w-16 h-16 md:w-12 md:h-12 lg:w-10 lg:h-10 object-cover rounded-full shadow-lg"
                    />
                  ) : (
                    <p>Image not available</p>
                  )}
                  <div className="flex-1">
                    <h1 className="text-white text-md font-medium line-clamp-1 overflow-hidden text-ellipsis">
                      {ele.title}
                    </h1>
                    <h1
                      className="text-sm text-white  line-clamp-1 overflow-hidden text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: ele.body }}
                    ></h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default BLogList;