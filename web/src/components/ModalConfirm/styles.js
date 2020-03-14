import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../styles/colors';

export const Modal = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

export const Background = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  z-index: 1;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  min-width: 320px;
  max-width: 640px;

  > div {
    min-height: 40px;
    line-height: 24px;
    display: flex;
    align-items: center;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 16px;

  button {
    font-size: 14px;
    font-weight: bold;
    line-height: 36px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 0px 15px;
    transition: 0.2s all;
    background: ${colors.blue};
    color: #fff;

    :hover {
      background: ${darken(0.03, `${colors.blue}`)};
    }
  }
  .cancel {
    background: #ccc;
    color: #fff;

    :hover {
      background: ${darken(0.03, '#CCC')};
    }
  }
`;
