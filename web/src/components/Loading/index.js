import React from 'react';
import { GiWeightLiftingDown, GiWeightLiftingUp } from 'react-icons/gi';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ size, color }) {
  return (
    <Container size={size}>
      <GiWeightLiftingDown className="down" color={color} size={size} />
      <GiWeightLiftingUp className="up" color={color} size={size} />
    </Container>
  );
}

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: 32,
  color: '#ee4d64',
};
