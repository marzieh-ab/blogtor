import React, { useState, useEffect } from "react";
import { AiTwotoneSwitcher } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import image from "../../uploads/BlogImage.jpg";

const Allblogs = () => {
  const [blogs, setBlogs] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/blog", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);

        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="
    flex flex-col justify-center items-center gap-2
    
    md:flex md:items-center md:flex-wrap  md:justify-around p-4"
    >
      {blogs &&
        blogs.map((data, i) => {
          return (
            <Link
              to={`/singleblog/${data._id}`}
              key={i}
              className="w-full flex flex-col justify-center items-center  md:w-[30%]   mt-4 h-[300px] border-[1px] border-[#ccc] "
            >
              <div className="flex  items-center   justify-center">
                <img
                  src={data.imgurl}
                  className=" w-[50%]  h-[160px]  object-cover"
                  alt=""
                  onError={(e) => (e.target.src = image)}
                />
              </div>

              <div className="mt-2">
                <h1 className="text-center">{data.title}</h1>
              </div>

              <div className="text-left  mt-10 p-2">
                {" "}
                CreateBy:
                <span className="bg-[#e67e22] text-[15px]   text-[#fff]  px-2  rounded-sm">
                  {data.creator.name}
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Allblogs;
