import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1230px;
  padding: 0px 30px;
  margin: 50px auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const CheckCircle = styled.span`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  background: ${props => (props.active ? '#42CB59' : '#DDDDDD')};
`;
