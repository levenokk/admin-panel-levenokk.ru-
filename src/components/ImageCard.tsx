import PropTypes from 'prop-types';
import React from 'react'
import { Box, Divider } from '@material-ui/core'
import RemoveImg from './RemoveImg'
import EditImg from './EditImg'

interface imageCardProps {
  url: string
  id: string
}

const ImageCard: React.FC<imageCardProps> = ({ url, id }) => {
  return (
    <Box position="relative" marginLeft="20px" marginTop="20px" width="200px">
      <Box display="flex" justifyContent="flex-end">
        <EditImg id={id} url={url} />
        <RemoveImg id={id} />
      </Box>
      <Divider />
      <Box marginTop="10px" display="flex" alignItems="center">
        <img style={{ maxWidth: '100%', height: 'auto' }} src={url} alt="" />
      </Box>
    </Box>
  )
}

ImageCard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default ImageCard
