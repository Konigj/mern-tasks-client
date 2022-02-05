import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({children}) => {
  const authContext = useContext(AuthContext)
  const {auth, loading, authUser} = authContext;

  useEffect(()=> {
    authUser();
    //eslint-disable-next-line
  }, [])

    return !auth  && !loading ? <Navigate to="/"/> : children 
};

export default PrivateRoute;
