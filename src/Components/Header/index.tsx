import React from 'react';
import Box from '@material-ui/core/Box';
import logo from 'logo.png';

const Header = () => {
  return (
    <Box component="header" className="App-header sticky top-0 h-16 flex items-center px-6 bg-green-900">
      <img src={logo} className="App-logo h-8" alt="logo" />
    </Box>
  );
}

export default Header;
