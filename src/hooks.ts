import { useDispatch, useSelector } from "../../node_modules/react-redux/dist/react-redux";
import { AppDispatch, RootState } from "./redux/rtkStore";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();