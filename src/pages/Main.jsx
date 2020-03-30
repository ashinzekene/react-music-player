import React from 'react';
import { Heading, List, Flex, Box } from '@chakra-ui/core';
import Song from '../components/Song';
import PlayerBar from '../components/PlayerBar';

const songs = Array(100).fill(
  {name: 'No bondage'}
)

const Main = () => (
  <Box width="100vw" minHeight="100vh" p={5}>
    <Flex justifyContent="space-between" alignItems="center">
      <Box py={20}>
        <Heading>Music Player</Heading>
      </Box>
    </Flex>
    <List>
      {songs.map((song, i) => (
        <Song key={song.name + i} song={song} />
      ))}
    </List>
    <PlayerBar />
  </Box>
);

export default Main;
