import { Store } from "./redux/Store";
import { GLOBAL_ERROR } from "./redux/actions/Types";
import { GlobalError } from "../models/Error";

export const popupError = (name: string, message: string) => {
  Store.dispatch({
    type: GLOBAL_ERROR,
    payload: new GlobalError(500, name, message),
  });
};
