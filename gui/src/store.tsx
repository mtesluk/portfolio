import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import notify from "./reducers/notify";
import user from "./reducers/user";
import isOpenLoginDialog from "./reducers/login-dialog";

export default createStore(
  combineReducers({
      notify,
      isOpenLoginDialog,
      user,
  }), {}, applyMiddleware(createLogger())
);