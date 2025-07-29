import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProfileUpdate() {
  const { token ,user} = useSelector((state) => state.user);
  const navigate = useNavigate();
  

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Profile image is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("image", image);

    try {
      const res = await axios.put("/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Updated user:", res.data);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Update failed");
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          className="w-full border px-3 py-2 rounded-lg"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
