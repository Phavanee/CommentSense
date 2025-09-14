import React from 'react';
import ReactDOM from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: '#4285F4' },
		secondary: { main: '#34A853' },
		success: { main: '#34A853' },
		warning: { main: '#FBBC05' },
		error: { main: '#EA4335' },
	},
	shape: { borderRadius: 10 },
	typography: {
		fontFamily: 'Inter, Roboto, Arial, sans-serif',
	},
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>
)
