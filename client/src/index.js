import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import { ExpensesContextProvider } from './Context/ExpensesContext/ExpensesContext';
import { App } from './App';
import theme from './ThemeConfig/theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ExpensesContextProvider>
        <ChakraProvider  >
            <ColorModeScript initialColorMode={'system'} />         
                <App />
          </ChakraProvider>
        </ExpensesContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
