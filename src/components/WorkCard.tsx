import PropTypes from 'prop-types';
import React from 'react'
import { Box, Divider } from '@material-ui/core'
import EditWork from './EditWork'
import RemoveWork from './RemoveWork'

interface workProps {
  img: {
    url: string
  }
  title: string
  url: string
  id: string
}

const Work: React.FC<workProps> = ({ id, url, img, title }) => {
  return (
    <Box component="article" position="relative" marginLeft="20px" marginTop="20px" width="200px">
      <Box display="flex" justifyContent="flex-end">
        <EditWork id={id} img={img?.url || ''} title={title} url={url} />
        <RemoveWork id={id} />
      </Box>
      <Divider />
      <Box marginTop="10px">
        <img style={{ maxWidth: '100%', height: 'auto' }} src={img?.url || ''} alt="" />
        <Box component="h5">
          <a href={url || '#'}>{title}</a>
        </Box>
      </Box>
    </Box>
  )
}

Work.propTypes = {
  img: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default Work
