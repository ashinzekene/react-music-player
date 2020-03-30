import React from 'react';
import { ListItem, Text, Box, Flex } from '@chakra-ui/core';
import { IoIosMusicalNotes } from 'react-icons/io';

const Song = ({ song }) => (
  <ListItem flex tabIndex={0} display="block" bg="gray" borderRadius={4} mb={3}>
    <Flex alignItems="center">
      <Box pr={3}>
        <Box as={IoIosMusicalNotes} size="30px"/>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight={700}>{ song.name }</Text>
        <Text>Song details</Text>
      </Box>
    </Flex>
  </ListItem>
);

export default Song;
