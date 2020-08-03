import { v4 as uuid } from 'uuid';
import {
  ADD_INCOME, ADD_EXPENSE, UPDATE_INCOME, UPDATE_EXPENSE, REMOVE_INCOME, REMOVE_EXPENSE
} from "actions/types";
import { ActionType } from 'appConsts/types';

export const uid: string = uuid();

const initialState = {
  transactions: {}
};

export default function (state = initialState, action: ActionType) {
  const { transactions } = state;
  const updatedState = { ...transactions };
  let id;
  switch (action.type) {
    case ADD_INCOME:
      return {
        ...state, transactions: { ...transactions, [uid]: [action.payload.name, "tracker", action.payload.amount] }
      };
    case ADD_EXPENSE:
      return {
        ...state, transactions: { ...transactions, [uid]: ["tracker", action.payload.name, action.payload.amount] }
      };
    case UPDATE_INCOME:
      id = action.payload.id;
      return {
        ...state, transactions: { ...transactions, [id as string]: [action.payload.name, "tracker", action.payload.amount] }
      };
    case UPDATE_EXPENSE:
      id = action.payload.id;
      return {
        ...state, transactions: { ...transactions, [id as string]: ["tracker", action.payload.name, action.payload.amount] }
      };
    case REMOVE_INCOME:
    case REMOVE_EXPENSE:
      id = action.payload.id;
      delete (updatedState as any)[id as string];
      return { ...state, transactions: updatedState };
    default:
      return state;
  }
}
