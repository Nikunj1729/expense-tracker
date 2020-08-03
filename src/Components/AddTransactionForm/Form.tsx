import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Button, InputLabel, FormControl, MenuItem, Select } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Transations } from 'appConsts/enums';
import { TransactionType } from 'appConsts/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: '45%',
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '60%',
        maxWidth: 400,
        marginTop: '20px'
      }
    },
    button: {
      margin: theme.spacing(2),
      maxWidth: 100,
    },
    formControl: {
      margin: theme.spacing(2),
      width: '60%',
      maxWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Form = (props: {
  submitTransaction: Function,
  defaultTransaction: TransactionType
}) => {
  const { submitTransaction, defaultTransaction } = props;
  const { t } = useTranslation();
  const [transaction, setTransaction] = useState(defaultTransaction);
  const classes = useStyles();

  const handleChange = (value: any, field: string) => {
    setTransaction({ ...transaction, [field]: value });
  };

  const resetFields = () => {
    setTransaction(defaultTransaction);
  }

  const submit = () => {
    submitTransaction(transaction);
    resetFields();
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <Box className="flex flex-col max-w-lg m-auto items-center">
        <TextField
          id="outlined-name-input"
          label={t("Transaction name")}
          type="Text"
          variant="outlined"
          onChange={(e) => handleChange(e.target.value, 'name')}
          value={t((transaction as any).name)}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">{t("Select Type")}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(e) => handleChange(e.target.value, 'type')}
            value={(transaction as any).type}
          >
            <MenuItem value={Transations.INCOME}>{t("Income")}</MenuItem>
            <MenuItem value={Transations.EXPENSE}>{t("Expense")}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-email-input"
          label={t("Amount")}
          type="number"
          variant="outlined"
          onChange={(e) => handleChange((e.target as HTMLInputElement).valueAsNumber, 'amount')}
          value={(transaction as any).amount}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={submit}
        >
          {t("Save")}
        </Button>
      </Box>
    </form >
  );
}

export default Form;