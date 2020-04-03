import React from 'react';
import {
  ListItem, Text, Box, Flex,
} from '@chakra-ui/core';
import { IoIosMusicalNotes } from 'react-icons/io';
import PropTypes from 'prop-types';

const Song = ({ song }) => (
  <ListItem flex tabIndex={0} display="block" bg="gray" borderRadius={4} mb={3} cursor="pointer" boxShadow="0px 1px 3px 0px #DDDD">
    <Flex alignItems="center">
      <Box p={3} pl={1} isTruncated>
        <Box as={IoIosMusicalNotes} size="30px" boxShadow="2px 2px 10px 0px #AAAA" borderRadius={4} />
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight={700}>{ song.name }</Text>
        <Text>Song details</Text>
      </Box>
    </Flex>
  </ListItem>
);

Song.propTypes = {
  song: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Song;
