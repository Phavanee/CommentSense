import { Button, Card, CardContent, MenuItem, Select, Stack, Typography } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useMemo, useState } from 'react';

const categories = ['Makeup', 'Skincare', 'Haircare', 'Hair Color'] as const;

type Category = typeof categories[number];

const categoryPie: Record<Category, { name: string; value: number }[]> = {
	Makeup: [
		{ name: 'This Category', value: 26 },
		{ name: 'Other', value: 74 },
	],
	Skincare: [
		{ name: 'This Category', value: 34 },
		{ name: 'Other', value: 66 },
	],
	Haircare: [
		{ name: 'This Category', value: 28 },
		{ name: 'Other', value: 72 },
	],
	'Hair Color': [
		{ name: 'This Category', value: 12 },
		{ name: 'Other', value: 88 },
	],
};

const ts: Record<Category, { period: string; positive: number }[]> = {
	Makeup: [
		{ period: '2025-08-01', positive: 60 },
		{ period: '2025-08-02', positive: 62 },
		{ period: '2025-08-03', positive: 61 },
	],
	Skincare: [
		{ period: '2025-08-01', positive: 64 },
		{ period: '2025-08-02', positive: 63 },
		{ period: '2025-08-03', positive: 65 },
	],
	Haircare: [
		{ period: '2025-08-01', positive: 58 },
		{ period: '2025-08-02', positive: 57 },
		{ period: '2025-08-03', positive: 59 },
	],
	'Hair Color': [
		{ period: '2025-08-01', positive: 55 },
		{ period: '2025-08-02', positive: 54 },
		{ period: '2025-08-03', positive: 56 },
	],
};

const words: Record<Category, { text: string; value: number }[]> = {
	Makeup: [
		{ text: 'pigment', value: 22 },
		{ text: 'blend', value: 18 },
		{ text: 'matte', value: 15 },
	],
	Skincare: [
		{ text: 'hydrating', value: 24 },
		{ text: 'soothing', value: 17 },
		{ text: 'SPF', value: 14 },
	],
	Haircare: [
		{ text: 'shine', value: 19 },
		{ text: 'repair', value: 16 },
		{ text: 'smooth', value: 13 },
	],
	'Hair Color': [
		{ text: 'vibrant', value: 20 },
		{ text: 'fade', value: 12 },
		{ text: 'tone', value: 10 },
	],
};

const CHART_HEIGHT = 260;

export default function ProductCategoryInsights() {
	const [selected, setSelected] = useState<Category>('Makeup');
	const [bucket, setBucket] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
	const pie = categoryPie[selected];
	const series = ts[selected];
	const wordList = words[selected];

	const wordCloudSvg = useMemo(() => (
		<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
			{wordList.map((w) => (
				<span key={w.text} style={{ fontSize: 10 + w.value, color: '#4285F4' }}>{w.text}</span>
			))}
		</div>
	), [wordList]);

	return (
		<div className="grid-8x12" style={{ padding: '0 0 12px 0', gridTemplateRows: '2px 2px auto 1fr 1fr 1fr', columnGap: 16, rowGap: 12 }}>
			{/* Box 1: row 3 columns 2-11, no outline */}
			<div style={{ gridColumn: '2 / 12', gridRow: '3 / 4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant="h6">Product Category Insights</Typography>
				<Stack direction="row" spacing={1}>
					<Select size="small" value={selected} onChange={(e) => setSelected(e.target.value as Category)}>
						{categories.map((c) => (
							<MenuItem key={c} value={c}>{c}</MenuItem>
						))}
					</Select>
					<Select size="small" value={bucket} onChange={(e) => setBucket(e.target.value as any)}>
						<MenuItem value="Daily">Daily</MenuItem>
						<MenuItem value="Weekly">Weekly</MenuItem>
						<MenuItem value="Monthly">Monthly</MenuItem>
					</Select>
					<Button variant="outlined">Filter</Button>
				</Stack>
			</div>

			{/* Box 2: columns 2-4 rows 4-5 (pie) */}
			<Card className="grid-box" style={{ gridColumn: '2 / 5', gridRow: '4 / 6' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Share of Mentions</Typography>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer>
							<PieChart>
								<Pie data={pie} dataKey="value" nameKey="name" outerRadius={86}>
									{pie.map((p, i) => (
										<Cell key={p.name} fill={i === 0 ? '#4285F4' : '#E0E0E0'} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Box 3: columns 5-11 rows 4-5 (time series) */}
			<Card className="grid-box" style={{ gridColumn: '5 / 12', gridRow: '4 / 6' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>% Positive Over Time</Typography>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer>
							<LineChart data={series}>
								<XAxis dataKey="period" />
								<YAxis unit="%" domain={[0, 100]} />
								<Tooltip />
								<Line type="monotone" dataKey="positive" stroke="#34A853" dot={false} strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Box 4: row 6-7 columns 2-11 (word cloud) */}
			<Card className="grid-box" style={{ gridColumn: '2 / 12', gridRow: '6 / 7' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Keyword Cloud</Typography>
					{wordCloudSvg}
				</CardContent>
			</Card>
		</div>
	);
} 