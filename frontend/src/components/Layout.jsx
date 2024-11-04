// components/Layout.jsx
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Navbar from './Navbar'; // Nếu bạn đã có thành phần Navbar

const Layout = ({ children }) => {
    return (
        <Flex direction="column" minHeight="100vh">

            <Flex flex="1">
                <Sidebar />
                <Box flex="1" p="20px" ml={{ base: '75px', md: '200px' }}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Layout;