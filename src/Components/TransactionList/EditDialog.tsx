import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { Transations } from 'appConsts/enums';
import Form from 'Components/AddTransactionForm/Form';
import { TransactionType } from 'appConsts/types';
import { updateExpense, updateIncome } from "actions";

const EditDialog = (props: any) => {
  const { handleClose, transaction, open, updateExpense, updateIncome } = props;
  const { t } = useTranslation();

  const saveTransaction = (transaction: TransactionType) => {
    const { name, amount, type, id } = transaction;
    switch (type) {
      case Transations.EXPENSE:
        updateExpense({ id, name, amount });
        break;
      case Transations.INCOME:
      default:
        updateIncome({ id, name, amount });
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="edit-transaction-form">
        <DialogTitle id="edit-transaction-form">{t("Update Transaction")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Update transaction details and save to see changes")}
          </DialogContentText>
          <Form defaultTransaction={transaction} submitTransaction={saveTransaction} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default connect(null, { updateExpense, updateIncome })(EditDialog);