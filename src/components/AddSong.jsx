import React from 'react';
import {
  IconButton, Menu, MenuButton, MenuList, MenuItem,
} from '@chakra-ui/core';
import { IoIosAdd } from 'react-icons/io';

const AddSong = () => {
  const add = (e) => {
    console.log(e.files);
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
