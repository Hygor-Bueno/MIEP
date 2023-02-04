import styled from 'styled-components';


export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  background-color: #FFF;
   padding: 20px; 

`;


export const ContainerImage = styled.View`
    align-items: center;
    margin-bottom: 10px;
`;

export const ContainerPicker = styled.View`
    flex: 1;
    flex-direction: row;
    margin: 10px;
`;

export const ContainerButton = styled.View`
    align-items: center;
    margin: 10px;
`;

export const Image = styled.Image`
    height: 200px;
    width:  300px;
`;

export const Button= styled.TouchableOpacity`
    background-color: green;
    width:300px;
    height:40px;
    align-items: center;
    border-radius: 6px;
    justify-content: center;
`;

export const ButtonMessage = styled.Text`
  font-size: 25px;
  color: white;
`;


export const ImageBack = styled.Image`
  flex: 1;
  /* resize-mode: cover; */
  width: 100%;
  height: 100%;
  z-index: 6;
  position: absolute;
`;