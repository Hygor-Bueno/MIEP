import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
`;

export const Image = styled.Image`
    width: 50%;
    height: 100%;
`;


export const ImageBack = styled.Image`
  flex: 1;
  /* resize-mode: cover; */
  width: 100%;
  height: 100%;
  z-index: 6;
  position: absolute;
`;