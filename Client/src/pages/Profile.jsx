import React from "react";

function Profile() {
  // Dummy user data (replace with real Redux/API data)
  const user = {
    name: "Mohammed Nihal",
    email: "nihal@example.com",
    role: "user", // Try changing to "User" to test
    image: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">MyApp Logo</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />

        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        {/* Role Button or Badge */}
        <div className="mt-3">
          {user.role === "Admin" ? (
            <button className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Admin
            </button>
          ) : (
            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
              {user.role}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Edit Profile
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
