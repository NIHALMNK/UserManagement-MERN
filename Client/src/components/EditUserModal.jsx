import React, { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useSelector } from "react-redux";

function EditUserModal({ isOpen, onClose, user, onUserUpdated }) {
  const { token } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });

      
      setPreviewUrl(user.image || "/default-avatar.jpg");
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("role", form.role);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(`/admin/update-user/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("User updated successfully!");
      if (onUserUpdated) onUserUpdated(res.data);
      onClose();
    } catch (err) {
      console.error("Error updating user", err);
      alert("Update failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <button onClick={onClose} className="absolute top-3 right-4 text-xl">✖</button>

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded-lg"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full border px-3 py-2 rounded-lg"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex items-center gap-4">
            <img
              src={previewUrl || "/default-avatar.jpg"}
              alt="Preview"
              className="w-16 h-16 rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="flex-1 border px-3 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
