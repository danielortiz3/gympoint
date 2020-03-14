import styled from 'styled-components';
import { darken } from 'polished';
import colors from './colors';

export const TitleActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  color: #444;
  font-weight: bold;
  font-size: 24px;
`;

export const Actions = styled.div`
  display: flex;

  > a,
  button {
    background: ${colors.blue};
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 36px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 0px 15px;
    transition: 0.2s all;

    :hover {
      background: ${darken(0.06, `${colors.blue}`)};
    }

    svg {
      margin-right: 5px;
    }
  }

  .cancel {
    background: #ccc;
    color: #fff;
    margin-right: 15px;

    :hover {
      background: ${darken(0.03, '#CCC')};
    }
  }
`;

export const Search = styled.div`
  position: relative;
  margin-left: 15px;

  input {
    border: 1px solid #ccc;
    height: 36px;
    color: #333;
    border-radius: 4px;
    padding: 0px 5px 0px 40px;

    ::placeholder {
      color: #999;
    }
  }

  svg {
    position: absolute;
    left: 16px;
    top: 10px;
  }
`;
