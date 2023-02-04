import React from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native';

const Loading = styled.ActivityIndicator`
  /* top:50%; */
  /* align-self: center; */
`;

const Container = styled.View`
`;

export default ({text}) => (
  <Container style={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    flex: 1
  }}>
    <Text style={{color:'black'}}>{text}</Text>
    <Loading size="large" color="#0000ff" />
  </Container>)