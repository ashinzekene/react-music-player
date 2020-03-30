import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';
import { IoIosPlay, IoIosMusicalNotes } from 'react-icons/io';

const PlayerBar = () => (
  <Box
    w={0.9}
    h={70}
    bg="white"
    left="50%"
    maxW={700}
    margin="auto"
    overflow="hidden"
    position="fixed"
    borderRadius={7}
    bottom={[30, 70]}
    style={{transform: "translate(-50%, 0)"}}
    boxShadow="0px 6px 15px 0px #CCCCCCCC"
  >
    <Box w="100%" bg="gray.100" h={1}>
      <Box h={1} w="20%" bg="gray.500"/>
    </Box>
    <Flex h="100%" alignItems="center" justifyContent="space-between">
      <Box p={3} pr={3} isTruncated>
        <Box as={IoIosMusicalNotes} size="30px" boxShadow="2px 2px 15px 0px #AAA" borderRadius={4}/>
      </Box>
      <Box flex="1">
        <Text fontSize="lg" fontWeight={700}>Shape of you</Text>
      </Box>
      <Box>
        <Box as={IoIosPlay} size="30px"/>
      </Box>
    </Flex>
  </Box>
);

export default PlayerBar;
