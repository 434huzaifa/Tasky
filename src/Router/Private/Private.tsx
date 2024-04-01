import { ReactNode } from "react";
import useAuth from "../../Hook/useAuth";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";
const Private = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Spin fullscreen></Spin>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default Private;
