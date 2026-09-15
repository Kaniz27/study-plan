import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><ThemeProvider><AuthProvider><App /></AuthProvider></ThemeProvider><Toaster position="top-right" toastOptions={{ duration: 2800 }} /></React.StrictMode>);
