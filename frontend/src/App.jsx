import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import { Box, useColorModeValue } from '@chakra-ui/react';

const App = () => {
  return (
    <Router>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
        <Routes>
          <Route path="/create" element={<CreatePage/>}></Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
