import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";

function Dashboard() {
  const { token, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userReady, setUserReady] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // 🔁 Reusable function to fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🧠 Auth check & data fetch
  useEffect(() => {
    if (!user || !user.role) return;

    setUserReady(true);

    if (user.role !== "admin") {
      navigate("/profile");
      return;
    }

    fetchUsers();
  }, [user, token, navigate]);

  // 🔍 Filtering
  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // ✏️ Edit user
  const handleEdit = (id) => {
    const userToEdit = users.find((u) => u._id === id);
    if (userToEdit) {
      setEditUser(userToEdit);
    }
  };

  // ❌ Delete user
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      await axios.put(
  `/admin/delete-user/${id}`,
  {}, 
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Something went wrong!");
    }
  };

  // 🔃 States
  if (!userReady)
    return <div className="text-center mt-10 text-lg">Loading user...</div>;
  if (loading)
    return <div className="text-center mt-10 text-lg">Loading users...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* 🔍 Search + ➕ Add User */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="p-2 border rounded-md w-full sm:max-w-sm shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add User
        </button>
      </div>

      {/* ➕ AddUser Modal */}
      <AddUserModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          fetchUsers();
        }}
      />

      {/* ✏️ EditUser Modal */}
      {editUser && (
        <EditUserModal
          isOpen={!!editUser}
          user={editUser}
          onClose={() => {
            setEditUser(null);
            fetchUsers();
          }}
          onUserUpdated={(updatedUser) => {
            console.log("User updated:", updatedUser);
          }}
        />
      )}

      {/* 👥 Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Avatar</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4">
                  <img
                    src={user.image ? user.image : "/default-avatar-icon-of-social-media-user-vector.jpg"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <p className="text-center py-4 text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
