/* eslint-disable import/no-extraneous-dependencies */

import type { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch;
