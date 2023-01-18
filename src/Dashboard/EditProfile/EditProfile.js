import React, { useState, useEffect } from "react";
// import image from '../../uploads/BlogImage.jpg'
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("ut");

export default function EditProfile() {
  const [curentUser, setCurentUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [file, setFile] = useState(null);

  const fetchMe = () => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: "{}",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurentUser(data);

        setName(data.name);
        setBio(data.bio);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (token) {
      console.log("token", token);
      fetchMe();
    } else {
      setLoading(true);
    }
  }, []);


  
  const editUser = () => {
    fetch("http://localhost:4000/user/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json", auth: `ut ${token}` },
      body: JSON.stringify({
        name: name,
        bio: bio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const submitAvatar = async () => {
    try {
      if (!file) return ;
      console.log(file);
      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${token}`,
        },
        body: formData,
      })
        .then((res) => {
         
          res.json()
         
        })
       
    } catch (error) {
      console.log("lol");
    }
  };

  return (
    <div className="md:mx-auto   ">
      <div className="   w-[100%]  shadow-lg shadow-[#ccc] p-4  text-center border-[1px] md:w-[70vw]  mt-4 mx-auto text-3xl">
        <h1 className="capitalize">EDITBLOG</h1>
      </div>

      <div className="w-[100%]  border-[1px]  shadow-lg  mt-5  p-4  rounded-md">
        <div>
          <div className=" flex flex-col items-center">
            <img
              src=""
              alt=""
              className="w-[200px]  h-[200px]  rounded-[50%]  border-[1px] "
            />
          </div>

          <div className="w[100%]  flex  flex-col items-center">
            <input
              type="file"
              className="mt-4"
             
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button
              className="bg-blue-500 text-[15px] p-2  text-[#fff]  w-[100px]  rounded-md  my-4"
              onClick={submitAvatar}
            >
              submit
            </button>
          </div>
        </div>

        <div className="my-7  flex flex-col items-center">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[500px]  p-2 border-[1px]  outline-none"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-[500px]  h-[200px]  border-[1px]  my-4  p-2"
          ></textarea>

          <button
            className="block  bg-blue-500 text-[15px] p-2  w-[100px] mx-auto text-[#fff]   rounded-md "
            onClick={editUser}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
