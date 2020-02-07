import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import notify from "./reducers/notify";

export default createStore(
    combineReducers({
        notify,
    }),
    {},
    applyMiddleware(createLogger())
);