import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

interface EmptyProps {
  children: React.ReactChild;
}

const EmptyLayout: React.FC<EmptyProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

EmptyLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default EmptyLayout;
