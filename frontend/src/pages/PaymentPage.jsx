import React, { useState, useEffect } from 'react';
import { Box, Button, Image, Heading, Text, Spinner, VStack, HStack, useColorModeValue, Badge, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '@chakra-ui/icons';

const PlanOption = ({ name, price, features, isSelected, onSelect }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = isSelected ? 'teal.500' : useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      p={6}
      width="full"
      height="full"
      bg={bgColor}
      boxShadow={isSelected ? 'lg' : 'md'}
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <VStack spacing={4} align="stretch" flex={1}>
        <Heading size="md">{name}</Heading>
        <Text fontSize="2xl" fontWeight="bold">
          {price} <Badge colorScheme="teal">VND/month</Badge>
        </Text>
        {features.map((feature, index) => (
          <HStack key={index}>
            <CheckIcon color="teal.500" />
            <Text>{feature}</Text>
          </HStack>
        ))}
      </VStack>
      <Button
        colorScheme={isSelected ? 'teal' : 'gray'}
        onClick={onSelect}
        mt={4}
      >
        {isSelected ? 'Selected' : 'Select Plan'}
      </Button>
    </Box>
  );
};

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Standard',
      price: '99,000',
      features: ['Basic features', 'Limited songs', 'Standard quality']
    },
    {
      name: 'Premium Pro',
      price: '199,000',
      features: ['All features', 'Unlimited songs', 'High quality audio', 'Offline mode']
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsProcessing(true);
  };

  useEffect(() => {
    let timer;
    if (isProcessing) {
      timer = setTimeout(() => {
        navigate('/success');
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, navigate]);

  return (
    <Box textAlign="center" py={10} px={6} maxWidth="1200px" margin="auto">
      {!isProcessing ? (
        <>
          <Heading as="h2" size="xl" mb={4}>
            Choose Your SoundBox Plan
          </Heading>
          <Text color={'gray.500'} mb={6}>
            Upgrade to Premium Pro for the ultimate music experience!
          </Text>
          <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={8} mb={8}>
            {plans.map((plan) => (
              <PlanOption
                key={plan.name}
                {...plan}
                isSelected={selectedPlan === plan}
                onSelect={() => handleSelectPlan(plan)}
              />
            ))}
          </Grid>
        </>
      ) : (
        <VStack spacing={6}>
          <Heading as="h2" size="xl">
            Processing Payment for {selectedPlan.name} Plan
          </Heading>
          <Text color={'gray.500'}>
            Please transfer {selectedPlan.price} VND according to the image below. You will be automatically redirected in 10 seconds.
          </Text>
          <Box boxShadow="lg" borderRadius="lg" overflow="hidden">
            <Image
              src="/Bankimg/462564925_1580417332564754_6516071490461345399_n.jpg"
              alt="Bank Transfer Details"
              maxWidth="400px"
              objectFit="contain"
            />
          </Box>
          <Spinner size="xl" color="teal.500" />
        </VStack>
      )}
    </Box>
  );
};

export default PaymentPage;

