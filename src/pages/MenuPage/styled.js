import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  background-color: #f1f1f1;
  /* padding: 20px; */
`;

export const ContainerImage = styled.View`
  flex: 1;
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  background-color: #f1f1f1;
  z-index: 12;
  /* padding: 20px; */
`;

export const ContainerProduct = styled.View`
  position: absolute;
  right: ${props=>props.padding};
  top:${props=>props.topp};
  z-index: 15;
  /* border: 1px;
  border-color: white; */
  /* background-color: aquamarine; */
  width: ${props=>props.width};
  height: ${props=>props.height};
`;

export const Product = styled.View`
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  /* border: 1px;
  border-color: blue; */
  margin-top: ${props=>props.marg};
  /* /* width: 500px; */
  /* height: 500px; */
  /* background-color: red;
  color: blue; */
  /* z-index: 40; */
`;


export const BackGroundImage = styled.ImageBackground`
  flex: 1;
  /* resize-mode: cover; */
  width: auto;
  height: auto;
`;

export const ProductList = styled.FlatList`
 /* width: 100%;
 height: 100%; */
 /* background-color: aliceblue; */
`;

export const Text = styled.Text`
  font-size: ${props=>props.size};
  color: black;
`;


export const TextPromo = styled.Text`
  color: red;
  font-size: ${props=>props.size};
`;

export const Image = styled.Image`
  flex: 1;
  /* resize-mode: cover; */
  width: auto;
  height: auto;
  z-index: 4;
`;


export const ImagePri = styled.Image`
  /* flex: 1; */
  /* resize-mode: cover; */
  width: auto;
  height: auto;
`;


export const ButtonEngine = styled.TouchableOpacity`
  z-index: 30;
  position: absolute;
  color: transparent;
  opacity: 0.5;
`;