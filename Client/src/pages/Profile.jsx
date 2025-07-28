import axios from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux/userSlice";


function Profile() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: null,
    email: null,
    role: null,
    image: null,
  });

  const handleLogout =async()=>{
    try{
       dispatch(logOut())
       if (!token) navigate('/login');
    }catch(err){
      console.log("Error logout profile", err);
      
    }
  }

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user||res.data;
        setForm({
          name: user.name,
          email: user.email,
          role: user.role,
          image:user.image,
        });
        console.log(user.image);
        
      } catch (err) {
        console.log("Error fetching profile", err);
      }
    };

    fetchProfile();
  }, [token]);

  useEffect(() => {
    console.log("Updated form:", form);
  }, [form]);

  if (!form.name || !form.email || !form.role) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }


  //----------------Admin-------------->
  const handleAdmin=()=>{
    navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">Profile</h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <img
          src={form.image || "/default-avatar-icon-of-social-media-user-vector.jpg"}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="text-xl font-semibold mt-4">{form.name}</h2>
        <p className="text-gray-600">{form.email}</p>

        <div className="mt-3">
          {form.role === "admin" ? (
            <button onClick={handleAdmin} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              Admin
            </button>
          ) : (
            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
              {form.role}
            </span>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={()=>navigate('/updateProfile')}>
            Edit Profile
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
