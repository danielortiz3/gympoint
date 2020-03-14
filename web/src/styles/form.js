import styled from 'styled-components';

export const FormContainer = styled.div`
  > div {
    margin-bottom: 20px;

    strong {
      display: block;
      margin-bottom: 10px;
      color: #444;
    }

    input {
      width: 100%;
      height: 45px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0px 10px;

      :focus {
        border-color: #ed3f58;
      }
    }

    span {
      color: #f00;
      align-self: center;
      display: block;
      margin-top: 5px;
    }

    .react-select-container {
      input {
        height: 31px;
      }

      .react-select__control {
        border-color: #ddd;
      }

      .react-select__control--is-focused {
        border-color: #ed3f58;
        box-shadow: none;
      }

      .react-select__menu {
        margin-top: 0px;
      }
    }
  }
`;

export const OneLine = styled.div`
  display: flex;
  margin: 0 -8px;

  > * {
    padding: 8px;
    flex-grow: 1;
    flex-basis: 0;
  }
`;
