import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  padding: 0px 30px;
  margin: 50px auto;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const ContentModal = styled.div`
  width: 425px;
  max-width: 100%;
  display: block;

  strong {
    display: block;
    margin-bottom: 5px;
    color: #444;
  }

  > div {
    resize: both;
    margin-bottom: 20px;
    color: #666;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    height: 125px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 10px;

    :focus {
      border-color: #ed3f58;
    }
  }
`;
