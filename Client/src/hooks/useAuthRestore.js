import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axiosInstance";
import { setUser, logOut } from "../redux/userSlice";

function useAuthRestore() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);

  useEffect(() => {
    const restore = async () => {
      if (!token || user) return; 

      try {
        const res = await axios.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(res.data.user || res.data));
      } catch (err) {
        console.error("Failed to restore session", err);
        dispatch(logOut());
      }
    };

    restore();
  }, [token, user, dispatch]);
}

export default useAuthRestore;
