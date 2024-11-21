// frontend/src/pages/SuccessPage.jsx

import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Box textAlign="center" py={10} px={6}>
            <Heading as="h2" size="xl" mb={4}>
                Thanh Toán Thành Công!
            </Heading>
            <Text color={'gray.500'} mb={6}>
                Cảm ơn bạn đã nâng cấp lên Premium. Các chức năng mới đã được mở khóa!
            </Text>
            <Button
                colorScheme="teal"
                onClick={handleGoHome}
            >
                Về Trang Chủ
            </Button>
        </Box>
    );
};

export default SuccessPage;