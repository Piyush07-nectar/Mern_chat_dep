// src/context/useAllUser.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function useAllUser() {
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/user/alluser", {
          withCredentials: true, // ✅ send cookies
        });

        if (isMounted) setAllUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getUsers();

    return () => {
      isMounted = false; // ✅ cleanup
    };
  }, []);

  return [allUserInfo, loading];
}
