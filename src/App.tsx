import React, { useState, useEffect, Suspense } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import store from "./store";
import Header from './Components/Header';
import Chart from './Components/Chart';
import AddTransaction from './Components/AddTransactionForm';
import TransactionList from './Components/TransactionList';

const MyComponent = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [initState, setInitState] = useState({ transactions: {} });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/data`)
      .then(res => {
        setLoading(false);
        setInitState({ transactions: res.data });
      })
      .catch(err => {
        setLoading(false);
        setError(true)
      });
  }, []);

  if (loading) {
    return (
      <Box className="flex items-center justify-center w-full h-full">
        <CircularProgress />
      </Box>
    );
  }
  else if (error) {
    return <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={true}
      autoHideDuration={6000}
      message="Error loading data from API. Please reload the application or try again."
    />;
  }
  else {
    return (
      <Provider store={store(initState)}>
        <Box className="App h-screen max-h-screen">
          <Header />
          <Box className="w-full h-full max-h-full-4 flex">
            <Chart />
            <Box className="w-6/12 h-full flex flex-col items-center justify-between py-16">
              <AddTransaction />
              <TransactionList />
            </Box>
          </Box>
        </Box>
      </Provider>
    );
  }

}

export default function App() {
  return (
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <MyComponent />
      </I18nextProvider>
    </Suspense>
  );
}