import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from '../components';
import { fetchFromAPI } from './utils/fetchFromApi';
import { useParams } from 'react-router-dom';

const Feed = () => {

  
  const [videos, setvideos] = useState([]);
  const {searchTerm}= useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => setvideos(data.items))

  }, [searchTerm])
  return (
    <>  
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          Search Result for:<span style={{ color: "#F31503" }}>{searchTerm}</span>
        </Typography>

      <Videos videos={videos} />

      </Box>
    </>


  )
}

export default Feed