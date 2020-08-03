import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/transactionReducer";

const store = (initalState: { transactions: {} }) => createStore(
  rootReducer,
  initalState,
  applyMiddleware(thunk)
);

export default store;
