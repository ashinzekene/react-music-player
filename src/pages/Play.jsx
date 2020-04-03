import React from 'react';
import {
  Box, IconButton, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb,
} from '@chakra-ui/core';
import { IoIosPlayCircle, IoIosSkipForward, IoIosSkipBackward } from 'react-icons/io';

const Play = () => (
  <Box w="100vw" h="100vh" p={5} maxW={800} margin="auto">
    <Flex justifyContent="space-between" alignItems="center" direction="column">
      <Box w="100%" py={4}>
        <IconButton
          isRound
          size="lg"
          variant="ghost"
          icon="chevron-left"
        />
      </Box>

      <Box
        margin="auto"
        w={200}
        h={200}
        borderRadius={20}
        boxShadow="0px 0px 50px 0px #CCCCCCCC"
      />

      <Box py={12} textAlign="center">
        <Text fontSize="2xl">Shape of You</Text>
        <Text>Ed Sheeran</Text>
      </Box>

      <Box position="fixed" bottom="0" width="100%" pb={10} px={5}>
        <Box py={12} w="100%" textAlign="center">
          <Slider value={30}>
            <SliderTrack bg="gray.100" />
            <SliderFilledTrack bg="gray.500" />
            <SliderThumb />
          </Slider>
          <Flex justifyContent="space-between">
            <Text fontSize="sm" color="#888888">0.32</Text>
            <Text fontSize="sm" color="#888888">3.30</Text>
          </Flex>
        </Box>

        <Box w="80%" margin="auto">
          <Flex justifyContent="space-around" alignItems="center">
            <Box>
              <Box as={IoIosSkipBackward} size="28px" />
            </Box>
            <Box>
              <Box as={IoIosPlayCircle} size="70px" />
            </Box>
            <Box>
              <Box as={IoIosSkipForward} size="28px" />
            </Box>
          </Flex>
        </Box>
      </Box>

    </Flex>
  </Box>
);

export default Play;
