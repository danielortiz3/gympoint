import React from 'react';

import { Container } from './styles';

import Header from '~/components/Header';

export default function defaultLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
