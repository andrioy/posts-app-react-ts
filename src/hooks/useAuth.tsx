import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext/AppContext";
const useAuth = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return user;
};

export default useAuth;
