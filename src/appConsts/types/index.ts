export type TransactionType = {
  name?: string;
  amount?: number;
  id?: string;
  type?: string;
};

export type ActionType = {
  type: string;
  payload: TransactionType;
};