import { Card, CardContent, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useState } from 'react';

const COLORS = ['#34A853', '#FBBC05', '#EA4335'];

const tsDaily = [
	{ period: '2025-08-01', positive: 62, neutral: 25, negative: 13 },
	{ period: '2025-08-02', positive: 60, neutral: 27, negative: 13 },
	{ period: '2025-08-03', positive: 63, neutral: 24, negative: 13 },
	{ period: '2025-08-04', positive: 61, neutral: 26, negative: 13 },
	{ period: '2025-08-05', positive: 64, neutral: 23, negative: 13 },
];
const tsWeekly = [
	{ period: '2025-W31', positive: 61, neutral: 26, negative: 13 },
	{ period: '2025-W32', positive: 63, neutral: 24, negative: 13 },
	{ period: '2025-W33', positive: 62, neutral: 25, negative: 13 },
];
const tsMonthly = [
	{ period: '2025-06', positive: 60, neutral: 27, negative: 13 },
	{ period: '2025-07', positive: 62, neutral: 25, negative: 13 },
	{ period: '2025-08', positive: 63, neutral: 24, negative: 13 },
];

const dist = [
	{ name: 'Positive', value: 63 },
	{ name: 'Neutral', value: 24 },
	{ name: 'Negative', value: 13 },
];

const categoryBars = [
	{ name: 'Hair Care', value: 28 },
	{ name: 'Skin Care', value: 34 },
	{ name: 'Hair Color', value: 12 },
	{ name: 'Makeup', value: 26 },
];

const spamVsClean = [
	{ name: 'Non-spam', value: 88 },
	{ name: 'Spam', value: 12 },
];

const CHART_HEIGHT = 260;

export default function ExecutiveOverview() {
	const [bucket, setBucket] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
	const ts = bucket === 'Daily' ? tsDaily : bucket === 'Weekly' ? tsWeekly : tsMonthly;

	return (
		<div className="grid-8x12" style={{ padding: '0 0 12px 0', gridTemplateRows: '2px 2px 1fr 1fr 1fr 1fr', columnGap: 16, rowGap: 20 }}>
			{/* Box 1: columns 2-8, rows 3-4 */}
			<Card className="grid-box" style={{ gridColumn: '2 / 9', gridRow: '3 / 5' }}>
				<CardContent sx={{ p: 2 }}>
					<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
						<Typography className="box-title">Sentiment Over Time</Typography>
						<Select size="small" value={bucket} onChange={(e) => setBucket(e.target.value as any)}>
							<MenuItem value="Daily">Daily</MenuItem>
							<MenuItem value="Weekly">Weekly</MenuItem>
							<MenuItem value="Monthly">Monthly</MenuItem>
						</Select>
					</Stack>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={ts} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
								<XAxis dataKey="period" tickMargin={6} />
								<YAxis unit="%" domain={[0, 100]} tickMargin={6} />
								<Tooltip />
								<Line type="monotone" dataKey="positive" stroke="#34A853" dot={false} strokeWidth={2} />
								<Line type="monotone" dataKey="neutral" stroke="#FBBC05" dot={false} strokeWidth={2} />
								<Line type="monotone" dataKey="negative" stroke="#EA4335" dot={false} strokeWidth={2} />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Box 2: columns 10-12, rows 3-4 */}
			<Card className="grid-box" style={{ gridColumn: '9 / 12', gridRow: '3 / 5' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Overall Sentiment</Typography>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer>
							<PieChart margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
								<Pie data={dist} dataKey="value" nameKey="name" outerRadius={86}>
									{dist.map((entry, index) => (
										<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Box 3: columns 2-7, rows 5-7 (horizontal bar) */}
			<Card className="grid-box" style={{ gridColumn: '2 / 7', gridRow: '5 / 7' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Most Mentioned Categories</Typography>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer>
							<BarChart data={categoryBars} layout="vertical" margin={{ left: 24, right: 8, top: 8, bottom: 0 }}>
								<XAxis type="number" hide />
								<YAxis type="category" dataKey="name" width={90} />
								<Tooltip />
								<Bar dataKey="value" fill="#4285F4" radius={[6, 6, 6, 6]} barSize={18} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* Box 4: columns 7-11, rows 5-7 */}
			<Card className="grid-box" style={{ gridColumn: '7 / 12', gridRow: '5 / 7' }}>
				<CardContent sx={{ p: 2 }}>
					<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
						<Typography className="box-title">Engagement Summary</Typography>
						<Typography variant="body2" color="text.secondary">Total Comments: 124,532 • Comment/Like Ratio: 0.42</Typography>
					</Stack>
					<div style={{ height: CHART_HEIGHT }}>
						<ResponsiveContainer>
							<PieChart margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
								<Pie data={spamVsClean} dataKey="value" nameKey="name" innerRadius={48} outerRadius={82}>
									{spamVsClean.map((s, i) => (
										<Cell key={s.name} fill={i === 0 ? '#34A853' : '#EA4335'} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 