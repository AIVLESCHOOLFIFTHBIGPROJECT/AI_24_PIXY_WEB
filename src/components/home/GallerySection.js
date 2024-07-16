import React from 'react';
import { Box, Typography, ImageList, ImageListItem } from '@mui/material';

const itemData = [
  { img: '/path-to-image1.jpg', title: 'Image 1' },
  { img: '/path-to-image2.jpg', title: 'Image 2' },
  { img: '/path-to-image3.jpg', title: 'Image 3' },
  // 더 많은 이미지 항목 추가
];

const GallerySection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        2022
      </Typography>
      <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default GallerySection;