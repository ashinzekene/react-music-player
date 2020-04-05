import React from 'react';
import {
  IconButton, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/core';
import 'assert';
import { IoIosAdd } from 'react-icons/io';
import { processSong } from '../utils';
import { useSongState } from '../state';

const AddSong = () => {
  const { addSongs } = useSongState();

  const add = async ({ target }) => {
    if (!target.files) return;
    const songs = await Promise.all(
      [...target.files].map(processSong),
    );
    addSongs(songs);
  };

  return (
    <>
      <Menu isOpen>
        <MenuButton
          as={IconButton}
          icon={IoIosAdd}
          isRound
          variant="ghost"
          fontSize="40px"
          size="lg"
        />
        <MenuList>
          <MenuItem as="label" htmlFor="add-songs">
            Add songs
          </MenuItem>
          <MenuItem as="label" htmlFor="add-folder">
            Import from a folder
          </MenuItem>
        </MenuList>
      </Menu>
      <input style={{ display: 'none' }} type="file" allowdirs="true" webkitdirectory="true" id="add-folder" onClick={add} accept="audio/*" />
      <input style={{ display: 'none' }} type="file" multiple id="add-songs" onClick={add} accept="audio/*" />
    </>
  );
};

export default AddSong;
