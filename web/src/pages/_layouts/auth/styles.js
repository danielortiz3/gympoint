import styled from 'styled-components';
import { darken } from 'polished';

import colors from '../../../styles/colors';

export const Wrapper = styled.div`
  background: ${colors.blue};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 40px 20px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  text-align: center;
  border-radius: 4px;
  padding: 50px 30px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin: 0px 0px 20px;
  }

  form {
    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      align-items: start;

      strong {
        color: #444;
        font-weight: bold;
        margin-bottom: 5px;
      }

      input {
        border: 1px solid #ddd;
        height: 45px;
        border-radius: 4px;
        width: 100%;
        padding: 0px 10px;

        ::placeholder {
          color: #999;
        }
      }

      span {
        color: #f00;
        align-self: center;
        display: block;
        margin-top: 5px;
      }
    }

    button {
      background: ${colors.blue};
      color: #fff;
      text-align: center;
      width: 100%;
      height: 45px;
      font-weight: bold;
      font-size: 16px;
      border-radius: 4px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      transition: 0.3s all;

      :hover {
        background: ${darken(0.06, `${colors.blue}`)};
      }
    }
  }
`;
