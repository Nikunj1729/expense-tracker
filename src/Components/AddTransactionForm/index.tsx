import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Form from './Form';
import { Transations } from 'appConsts/enums';
import { TransactionType } from 'appConsts/types';
import { addExpense, addIncome } from "actions";


const AddTransactionForm = (props: any) => {
  const { addIncome, addExpense } = props;
  const defaultTransaction: TransactionType = { name: "", type: "", amount: 0 };
  const { t } = useTranslation();

  const saveTransaction = (transaction: TransactionType) => {
    const { name, amount, type } = transaction;
    switch (type) {
      case Transations.EXPENSE:
        addExpense({ name, amount });
        break;
      case Transations.INCOME:
      default:
        addIncome({ name, amount });
    }
  };

  return (
    <>
      <Typography variant="h5" component="div" className="w-full text-center">
        {t("Add Transaction")}
      </Typography>
      <Box className="w-full h-6/12">
        <Form defaultTransaction={defaultTransaction} submitTransaction={saveTransaction} />
      </Box>
    </>
  );
}

export default connect(null, { addExpense, addIncome })(AddTransactionForm);