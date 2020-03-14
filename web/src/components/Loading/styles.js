import styled, { keyframes } from 'styled-components';

const animation = keyframes`  
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  > svg {
    position: absolute;
    left: 0;
    top: 0;
    animation-name: ${animation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .down {
    animation-delay: 0.5s;
  }
`;
