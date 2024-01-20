import { Box } from '@mui/material';
import { memo } from 'react';

const ContentWrapper = ({ children, id }: any) => {
  return (
    <Box id={`content_${id}`} sx={{ minHeight: '100vh' }}>
      {children}
    </Box>
  );
};

export default memo(ContentWrapper);
