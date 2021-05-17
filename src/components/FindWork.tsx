import { Grid, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';

interface FindWorksProps {
  filter: React.Dispatch<React.SetStateAction<string>>;
}

const FindWork: React.FC<FindWorksProps> = ({ filter }) => {
  return (
    <Grid container={true} spacing={1} alignItems='flex-end'>
      <Grid item={true}>
        <TextField
          placeholder='Шукати...'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            filter(e.target.value.toLowerCase());
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

FindWork.propTypes = {
  filter: PropTypes.func.isRequired,
};

export default FindWork;
