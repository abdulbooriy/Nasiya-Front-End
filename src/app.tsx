import "src/global.css";
import type { TypedUseSelectorHook } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "src/routes/sections";
import { useScrollToTop } from "src/hooks/use-scroll-to-top";
import Loader from "./components/loader/Loader";
import Snackbar from "./components/snackbar/Snankbar";
import { refreshProfile } from "./store/actions/authActions";
import type { RootState, AppDispatch } from "./store";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function App() {
  useScrollToTop();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoadingRefresh, loggedIn } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedProfile = localStorage.getItem("userProfile");

    if (loggedIn) {
      return;
    }

    if (token && savedProfile) {
      dispatch(refreshProfile());
    } else if (token && !savedProfile) {
      dispatch(refreshProfile());
    }
  }, []);

  if (isLoadingRefresh) {
    return <Loader />;
  }

  return (
    <>
      <Router />
      <Snackbar />
    </>
  );
}
