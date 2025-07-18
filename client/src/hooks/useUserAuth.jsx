import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) return;

         const token = localStorage.getItem("token");
        if (!token) {
            clearUser();
            navigate("/login");
            return;
        }


        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data.data) {
                    updateUser(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info", error);
                if (isMounted) {
                    clearUser();
                    navigate("/login");
                }
            }
        };

        fetchUserInfo();
        return () => {
            isMounted = false;
        };
        
    }, [updateUser, clearUser, navigate]);
};

