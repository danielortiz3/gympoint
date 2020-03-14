import React from 'react';

import { Wrapper, Container } from './styles';

export default function auth({ children }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}
