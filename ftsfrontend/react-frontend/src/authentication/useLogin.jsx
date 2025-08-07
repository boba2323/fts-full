// authentication/useLogin.js
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider"; // adjust path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const useLogin = () => {
  const { hitMeandFetch } = useAuth();
  const navigate = useNavigate();

  const loginUser = async ({ email, password, setLoading }) => {
    try {
      setLoading?.(true);
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/api/token/",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login success:", response.data);
        await hitMeandFetch(); // sets userIn etc.
        
      }
      const showToastMessage = () => {
            toast.success("You have logged in!", {
            position: "bottom-right"
            });
        };
        showToastMessage()

      navigate("/fts", { replace: true });
    } catch (error) {
        const showToastMessage = () => {
            toast.error("You couldnt log in", {
            position: "bottom-right"
            });
        };
        showToastMessage()
      if (error.response) {
        console.log(error.message)
      } else {
        console.error("Login network error:", error.message);
      }
    } finally {
      setLoading?.(false);
    }
  };

  return loginUser;
};
