import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IRole } from "../../types/role";
import { RootState } from "../../store";

export type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRoles: IRole;
};

export function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const { loggedIn, profile, isLoadingRefresh } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingRefresh) {
      return;
    }

    console.log("ProtectedRoute Debug:");
    console.log("  loggedIn:", loggedIn);
    console.log("  profile.role:", profile.role);
    console.log("  requiredRoles:", requiredRoles);
    console.log("  isLoadingRefresh:", isLoadingRefresh);

    const token = localStorage.getItem("accessToken");
    const savedProfile = localStorage.getItem("userProfile");

    if (token && savedProfile && !loggedIn) {
      // Bu holatda redirect qilmaslik kerak!
      return;
    }

    if (!token && !loggedIn) {
      navigate("/", { replace: true });
      return;
    }

    if (loggedIn && profile.role && requiredRoles !== profile.role) {
      navigate("/", { replace: true });
      return;
    }
  }, [
    profile.role,
    isLoadingRefresh,
    loggedIn,
    navigate,
    requiredRoles,
    profile.firstname,
  ]);

  if (isLoadingRefresh) {
    return null; // yoki <Loader />
  }

  return <>{children}</>;
}
