import { Box, Button, Card, CardContent, Stack, TextField, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { loadVideosData, type VideoData } from '../utils/dataLoader';

function sentimentEmoji(label: 'positive' | 'neutral' | 'negative') {
	switch (label) {
		case 'positive':
			return '😊';
		case 'neutral':
			return '😐';
		case 'negative':
			return '😞';
	}
}

// Generate faux sentiment based on video ID (you can replace this with real sentiment data later)
function getSentimentForVideo(videoId: string): 'positive' | 'neutral' | 'negative' {
	const hash = videoId.split('').reduce((a, b) => {
		a = ((a << 5) - a) + b.charCodeAt(0);
		return a & a;
	}, 0);
	const sentimentIndex = Math.abs(hash) % 3;
	return ['positive', 'neutral', 'negative'][sentimentIndex] as 'positive' | 'neutral' | 'negative';
}

export default function CampaignLevelInsights() {
	const [query, setQuery] = useState('');
	const [currentId, setCurrentId] = useState('');
	const [videos, setVideos] = useState<VideoData[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const currentVideo = videos.find(v => v.videoId === currentId);
	const sentiment = currentId ? getSentimentForVideo(currentId) : 'neutral';

	// Load videos data on component mount
	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				const data = await loadVideosData();
				setVideos(data);
				if (data.length > 0) {
					setCurrentId(data[0].videoId); // Set first video as default
				}
			} catch (err) {
				setError('Failed to load video data');
				console.error('Error loading videos:', err);
			} finally {
				setLoading(false);
			}
		}
		loadData();
	}, []);

	function onSearch() {
		const found = videos.find(v => v.videoId === query.trim());
		if (found) {
			setCurrentId(found.videoId);
			setQuery(''); // Clear search field
		}
	}

	if (loading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
				<CircularProgress />
				<Typography sx={{ ml: 2 }}>Loading video data...</Typography>
			</div>
		);
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
				<Typography color="error">{error}</Typography>
			</div>
		);
	}

	return (
		<div className="grid-8x12" style={{ padding: '0 0 12px 0', gridTemplateRows: '2px 2px auto 1fr 1fr 1fr', columnGap: 16, rowGap: 16 }}>
			{/* Box 1: row 3 columns 2-11, no outline */}
			<div style={{ gridColumn: '2 / 12', gridRow: '3 / 4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant="h6">
					{currentVideo ? `Video ${currentId} - ${currentVideo.merge}` : 'Select a video'}
				</Typography>
				<Stack direction="row" spacing={1}>
					<TextField 
						size="small" 
						placeholder="Search Video ID" 
						value={query} 
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && onSearch()}
					/>
					<Button variant="contained" onClick={onSearch}>Search</Button>
				</Stack>
			</div>

			{/* Box 2: columns 2-4 rows 4-5 sentiment box */}
			<Card className="grid-box" style={{ gridColumn: '2 / 5', gridRow: '4 / 6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CardContent sx={{ textAlign: 'center', width: '100%', p: 2 }}>
					<Box sx={{ fontSize: 96, lineHeight: 1 }}>{sentimentEmoji(sentiment)}</Box>
					<Typography sx={{ mt: 1, textTransform: 'capitalize', fontSize: 20, fontWeight: 600 }}>{sentiment}</Typography>
				</CardContent>
			</Card>

			{/* Box 3: columns 5-11 rows 4-5 Video Information */}
			<Card className="grid-box" style={{ gridColumn: '5 / 12', gridRow: '4 / 6' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Video Information</Typography>
					<Stack direction="row" spacing={2}>
						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>Details</Typography>
							<Box sx={{ border: '1px solid #eee', borderRadius: 1, p: 1 }}>
								<Typography variant="body2"><strong>Category:</strong> {currentVideo?.categories || 'N/A'}</Typography>
								<Typography variant="body2"><strong>Published:</strong> {currentVideo?.publishedAt || 'N/A'}</Typography>
								<Typography variant="body2"><strong>Title:</strong> {currentVideo?.merge || 'N/A'}</Typography>
							</Box>
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography variant="subtitle2" sx={{ mb: 1 }}>Available Videos</Typography>
							<Box sx={{ border: '1px solid #eee', borderRadius: 1, p: 1, maxHeight: 120, overflow: 'auto' }}>
								{videos.slice(0, 5).map((video) => (
									<Typography 
										key={video.videoId} 
										variant="body2" 
										sx={{ 
											cursor: 'pointer', 
											color: video.videoId === currentId ? 'primary.main' : 'text.primary',
											'&:hover': { backgroundColor: 'action.hover' }
										}}
										onClick={() => setCurrentId(video.videoId)}
									>
										{video.videoId}: {video.merge.substring(0, 30)}...
									</Typography>
								))}
								{videos.length > 5 && (
									<Typography variant="caption" color="text.secondary">
										...and {videos.length - 5} more
									</Typography>
								)}
							</Box>
						</Box>
					</Stack>
				</CardContent>
			</Card>

			{/* Box 4: row 6-7 columns 2-11 summary text */}
			<Card className="grid-box" style={{ gridColumn: '2 / 12', gridRow: '6 / 7' }}>
				<CardContent sx={{ p: 2 }}>
					<Typography className="box-title" sx={{ mb: 1 }}>Video Summary</Typography>
					<Typography variant="body2">
						{currentVideo ? (
							`Video ${currentVideo.videoId} in the ${currentVideo.categories} category was published on ${currentVideo.publishedAt}. 
							The overall sentiment analysis shows a ${sentiment} response from the audience. 
							This video is part of the ${currentVideo.merge} collection.`
						) : (
							'Select a video to see its summary and sentiment analysis.'
						)}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}