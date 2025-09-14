import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import ExecutiveOverview from './pages/ExecutiveOverview';
import ProductCategoryInsights from './pages/ProductCategoryInsights';
import CampaignLevelInsights from './pages/CampaignLevelInsights';

function TopNav() {
	const location = useLocation();
	const current = location.pathname;
	return (
		<AppBar position="static" color="inherit" elevation={1}>
			<Toolbar sx={{ display: 'flex', gap: 2 }}>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>L'Oréal Sentiment</Typography>
				<Button component={Link} to="/" variant={current === '/' ? 'contained' : 'text'}>Executive Overview</Button>
				<Button component={Link} to="/products" variant={current.startsWith('/products') ? 'contained' : 'text'}>Product Category Insights</Button>
				<Button component={Link} to="/campaigns" variant={current.startsWith('/campaigns') ? 'contained' : 'text'}>Campaign Level Insights</Button>
			</Toolbar>
		</AppBar>
	);
}

export default function App() {
	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<TopNav />
			<Box component="main" sx={{ flex: 1 }}>
				<Container maxWidth="xl" sx={{ py: 2 }}>
					<Routes>
						<Route path="/" element={<ExecutiveOverview />} />
						<Route path="/products" element={<ProductCategoryInsights />} />
						<Route path="/campaigns" element={<CampaignLevelInsights />} />
					</Routes>
				</Container>
			</Box>
		</Box>
	);
}
