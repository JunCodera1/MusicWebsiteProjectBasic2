

import React from 'react';
import { Box } from '@chakra-ui/react';

const AI = () => {
    return (
        <Box width="100%" height="100vh">
            <iframe
                src="http://localhost:4321" // Đường dẫn ứng dụng translaher
                title="Translaher App"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
        </Box>
    );
};

export default AI;