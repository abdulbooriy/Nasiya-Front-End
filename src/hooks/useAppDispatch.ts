/* eslint-disable import/no-extraneous-dependencies */

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
