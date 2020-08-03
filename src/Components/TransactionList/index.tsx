import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditDialog from './EditDialog';
import { TransactionType } from 'appConsts/types';
import { Transations } from 'appConsts/enums';
import { removeExpense, removeIncome } from "actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '60%',
      minWidth: 400,
      maxHeight: '45%',
      overflow: 'auto'
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    }
  }),
);

const mapStateToProps = (state: any) => {
  return {
    report: state.transactions || {}
  }
}

const TransactionList = (props: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const defaultTransaction: TransactionType = { name: "", type: "", amount: 0 };
  const [transaction, setTransaction] = useState(defaultTransaction);
  const { report, removeExpense, removeIncome } = props;
  const listLength = Object.keys(report).length;

  const removeItem = (id: string, type: string) => {
    switch (type) {
      case Transations.EXPENSE:
        removeExpense(id);
        break;
      case Transations.INCOME:
      default:
        removeIncome(id);
    }
  }

  const editItem = (id: string) => {
    const type = report[id][0] === Transations.TRACKER ? Transations.EXPENSE : Transations.INCOME;
    const name = report[id][0] === Transations.TRACKER ? report[id][1] : report[id][0];
    const amount = report[id][2];
    setTransaction({ id, name, type, amount })
    setOpen(true);
  }

  return (
    <>
      <Typography variant="h5" component="div" className="w-full mt-10 text-center">
        {t("Transaction List")}
      </Typography>
      <div className={classes.root}>
        <div className={classes.demo}>
          <List>
            {
              Object.keys(report).map((key: string) => {
                const type = report[key][0] === Transations.TRACKER ? Transations.EXPENSE : Transations.INCOME;
                const name = report[key][0] === Transations.TRACKER ? report[key][1] : report[key][0];
                const amount = report[key][2];
                return (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={t(name)}
                      color="primary"
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="primary"
                          >
                            {t("Type")}
                          </Typography>
                          {` — ${t(type)} `}
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="primary"
                          >
                            {t("Amount")}
                          </Typography>
                          {` — ${amount}`}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" className="outline-none" onClick={() => editItem(key)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => removeItem(key, type)} disabled={listLength <= 1} className="outline-none">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }
          </List>
        </div>
      </div >
      <EditDialog open={open} handleClose={() => setOpen(false)} transaction={transaction} />
    </>
  );
}

export default connect(mapStateToProps, { removeExpense, removeIncome })(TransactionList);