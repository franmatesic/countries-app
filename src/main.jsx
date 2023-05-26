import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home, {homeLoader} from './pages/home.jsx';
import Country, {countryLoader} from './pages/country.jsx';
import Layout from './layout.jsx';
import './main.css';
import Info from './pages/info.jsx';
import {ThemeProvider} from 'styled-components';
import {theme} from './lib/styles.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: ':continentCode?',
                element: <Home/>,
                loader: homeLoader
            },
            {
                path: ':continentCode/:countryCode',
                element: <Country/>,
                loader: countryLoader
            },
            {
                path: 'info',
                element: <Info/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);
