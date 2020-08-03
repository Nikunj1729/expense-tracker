import { ADD_INCOME, ADD_EXPENSE, UPDATE_INCOME, UPDATE_EXPENSE, REMOVE_INCOME, REMOVE_EXPENSE } from "./types";
import { TransactionType } from 'appConsts/types';

export const addIncome = (transaction: TransactionType) => {
  return {
    type: ADD_INCOME,
    payload: transaction
  };
};

export const addExpense = (transaction: TransactionType) => {
  return {
    type: ADD_EXPENSE,
    payload: transaction
  };
};

export const updateIncome = (transaction: TransactionType) => {
  return {
    type: UPDATE_INCOME,
    payload: transaction
  };
};

export const updateExpense = (transaction: TransactionType) => {
  return {
    type: UPDATE_EXPENSE,
    payload: transaction
  };
};

export const removeIncome = (id: string) => {
  return {
    type: REMOVE_INCOME,
    payload: { id }
  };
};

export const removeExpense = (id: string) => {
  return {
    type: REMOVE_EXPENSE,
    payload: { id }
  };
};
