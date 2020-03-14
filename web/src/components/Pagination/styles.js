import styled from 'styled-components';

export const Container = styled.div``;

export const Pages = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0 15px 0;
`;

export const PageButton = styled.button`
  border: 1px solid #ccc;
  text-align: center;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #333;
  cursor: pointer;

  ${props => props.current && 'background:#ED3F58; color:#FFF;'}
`;
