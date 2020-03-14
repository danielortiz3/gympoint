import styled from 'styled-components/native';

import Input from '~/components/Input';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 20px;
`;

export const QuestionText = styled(Input)`
  background: #fff;
  margin-bottom: 20px;
  height: auto;
`;
