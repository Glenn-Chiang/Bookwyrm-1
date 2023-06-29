import { useContext } from "react";
import { AuthContext } from "../authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const user = useContext(AuthContext);

    if (user === undefined) { // Loading state; pending authentication check
      return null;
    }

    return user ? <Outlet/> : <Navigate to='/signIn' />
}