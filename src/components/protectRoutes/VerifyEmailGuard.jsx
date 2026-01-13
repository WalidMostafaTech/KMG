import { getProfileAct } from "@/store/profile/profileSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import LoadingPage from "../Loading/LoadingPage";

const VerifyEmailGuard = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
  }, [dispatch]);

  if (loading) return <LoadingPage />;

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.is_verified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VerifyEmailGuard;
