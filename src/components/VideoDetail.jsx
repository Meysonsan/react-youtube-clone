import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Typography, Box, Stack } from '@mui/material';
import { 
    CheckCircle as CheckCircleIcon, 
    Visibility as VisibilityIcon 
    } from '@mui/icons-material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState(null);
    const [videos, setVideos] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetchFromAPI(`videos?part=contentDetails,snippet,statistics&id=${id}`)
            .then((data) => setVideoDetail(data?.items[0]));
        
        fetchFromAPI(`search?part=snippet&relatedVideoId=${id}&type=video`)
            .then((data) => setVideos(data.items))
    }, [id]);

    if (!videoDetail?.snippet) return 'Loading...';

    const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: 'colum', md: 'row' }}>
                <Box flex={1}>
                    <Box sx={{ width: '100%', position: 'sticky', top: '86px'}}>
                        <ReactPlayer 
                            url={`https://www.youtube.com/watch?v=${id}`} 
                            className="react-player"
                            controls
                        />
                        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
                            <Link to={`/channel/${channelId}`}>
                                <Typography sx={{typography: { sm: 'subtitle1', md: 'h6' }}} color="#fff">
                                    {channelTitle}
                                    <CheckCircleIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Box sx={{ opacity: 0.7 }} display="flex" alignItems="center">
                                    <Typography variant="body1">
                                        {parseInt(viewCount).toLocaleString()}
                                    </Typography>
                                    <VisibilityIcon sx={{ ml: 1 }} size="small" fontSize="small" />
                                </Box>
                                <Box sx={{ opacity: 0.7 }} display="flex" alignItems="center">
                                    <Typography variant="body1">
                                        {parseInt(likeCount).toLocaleString()}
                                    </Typography>
                                    <ThumbUpIcon sx={{ ml: 1 }} size="small" fontSize="small" />
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
                    <Videos videos={videos} direction="column" />
                </Box>
            </Stack>
        </Box>
    )
}

export default VideoDetail