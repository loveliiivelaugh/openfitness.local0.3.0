import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LocalDatabaseProvider } from "@database";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <LocalDatabaseProvider>
            <App />
        </LocalDatabaseProvider>
    </React.StrictMode>,
);
