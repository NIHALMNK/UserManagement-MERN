import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Profile from '../pages/Profile.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import ProfileUpdate from '../pages/ProfileUpdate.jsx';

function AppRoutes() {

  return (
    
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profile' element={ <ProtectedRoute> <Profile/> </ProtectedRoute>}/>
      <Route path='/updateProfile' element={ <ProtectedRoute> <ProfileUpdate/> </ProtectedRoute>}/>
     </Routes>

  );
}

export default AppRoutes;
