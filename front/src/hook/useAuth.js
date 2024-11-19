import { useEffect, useState } from "react";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const navigate = useNavigate();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    const token = cookies.get("userToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        console.log(decodedToken);

        if (decodedToken.exp < currentTime) {
          // @todo mettre en place refresh token
          navigate("/login");
        } else {
          setAuthenticatedUser(decodedToken);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        setAuthenticatedUser(null);
        navigate("/login");
      }
    } else {
      setAuthenticatedUser(null);
      navigate("/login");
    }
  }, [navigate, cookies.get("userToken")]);

  return { authenticatedUser };
};

export default useAuth;