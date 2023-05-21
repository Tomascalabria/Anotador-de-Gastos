import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import theme from './ThemeConfig/theme'
import { ExpensesContextProvider } from './Context/ExpensesContext/ExpensesContext.js';
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <AuthContextProvider>
    <ExpensesContextProvider>
        
    <BrowserRouter>
    <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <App/>

    </ChakraProvider>
    </BrowserRouter>
    </ExpensesContextProvider>
    </AuthContextProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
