import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from './utils/fetchFromApi'
import { CheckCircle } from '@mui/icons-material'
import Videos from './Videos'

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(data => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&relativeToVideoId=${id}&type=video`).then(data => setVideos(data.items))
  }, [id]);

  if (!videoDetail?.snippet) return 'loading...'

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>

        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
            <Typography color="#fff" variant="h5" fontWeight="bold">{title}</Typography>

            <Stack direction="row" justifyContent="space-between" sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }}>{channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: "grey", ml: '5px' }} />
                </Typography>
              </Link>

              <Stack direction="row" gap="10px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(viewCount).toLocaleString()} views</Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>{parseInt(likeCount).toLocaleString()} likes</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

      <Box>
        <Videos videos={videos} direction="column"/>
      </Box>
      </Stack>


    </Box>
  )
}

export default VideoDetail