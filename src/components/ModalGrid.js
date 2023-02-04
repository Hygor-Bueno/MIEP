import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GridContext} from '../context/GridContext';

const Container = styled.SafeAreaView`
  flex: 1;
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;


const ContainerForm = styled.ScrollView`
  /* padding: 20px; */
  margin: 10px;
  background-color: #fffff1;
  width: 40%;
  /* height: 100%; */
`;

const InputArea = styled.View`
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  margin:0 20px;
  margin-bottom: 5px;
  border: #000000 solid 1px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;

const Text = styled.Text`
  font-size: 16px;
  margin:0 20px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  background-color: green;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin:0 20px;
`;

export default ({setModalVisible}) => {
  const [widthGrid, setWidthGrid] = React.useState('');
  const [heightGrid, setHeightGrid] = React.useState('');
  const [paddingGrid, setPaddingGrid] = React.useState('');
  const [topGrid, setTopGrid] = React.useState('');
  const [sizeFont, setSizeFont] = React.useState('');
  const [marginFont, setMarginFont] = React.useState('');
  const {dispatch: gridDispatch, state: gridState} = useContext(GridContext);

  useEffect(async () => {
    gridState.widthGrid != '' && setWidthGrid(gridState.widthGrid);
    gridState.heightGrid != '' && setHeightGrid(gridState.heightGrid);
    gridState.paddingGrid != '' && setPaddingGrid(gridState.paddingGrid);
    gridState.topGrid != '' && setTopGrid(gridState.topGrid);
    gridState.sizeFont != '' && setSizeFont(gridState.sizeFont);
    gridState.marginFont != '' && setMarginFont(gridState.marginFont);
  }, []);

  const HandleClick = async () => {
    let isActive = true;

    if (isActive) {
      try {

        if (widthGrid != '') {
          await AsyncStorage.setItem('widthGrid', JSON.stringify(widthGrid));
          gridDispatch({
            type: 'setWidth',
            payload: {width: widthGrid},
          });
        }


        if (heightGrid != '') {
          await AsyncStorage.setItem('heightGrid', JSON.stringify(heightGrid));
          gridDispatch({
            type: 'setHeight',
            payload: {height: heightGrid},
          });
        }


        if (paddingGrid != '') {
          await AsyncStorage.setItem(
            'paddingGrid',
            JSON.stringify(paddingGrid),
          );
          gridDispatch({
            type: 'setPadding',
            payload: {padding: paddingGrid},
          });
        }


        if (topGrid != '') {
          await AsyncStorage.setItem(
            'topGrid',
            JSON.stringify(topGrid),
          );
          gridDispatch({
            type: 'setTop',
            payload: {top: topGrid},
          });
        }


        if (marginFont != '') {
            (await AsyncStorage.setItem(
              'marginFont',
              JSON.stringify(marginFont),
            ));
          gridDispatch({
            type: 'setMargin',
            payload: {margin: marginFont},
          });
        }


        if (sizeFont != '') {
          await AsyncStorage.setItem('sizeFont', JSON.stringify(sizeFont));
          gridDispatch({
            type: 'setSize',
            payload: {size: sizeFont},
          });
        }


        setModalVisible(false);
      } catch (e) {
        console.warn('asyncStorage', e);
      }
    }

    return (isActive = false);
  };

  return (
    <Container>
      <ContainerForm>
        <Text>tamanho da grade</Text>
        <InputArea>
          <Input
            value={widthGrid}
            placeholder={'Tamanho da grade'}
            onChangeText={text => setWidthGrid(text)}
          />
        </InputArea>

        <Text>Altura da grade</Text>
        <InputArea>
          <Input
            value={heightGrid}
            placeholder={'Altura da grade'}
            onChangeText={text => setHeightGrid(text)}
          />
        </InputArea>

        <Text>Distancia lateral</Text>
        <InputArea>
          <Input
            value={paddingGrid}
            placeholder={'distancia lateral'}
            onChangeText={text => setPaddingGrid(text)}
          />
        </InputArea>

        <Text>Distancia do topo</Text>
        <InputArea>
          <Input
            value={topGrid}
            placeholder={'top'}
            onChangeText={text => setTopGrid(text)}
          />
        </InputArea>

        <Text>tamanho da fonte</Text>
        <InputArea>
          <Input
            value={sizeFont}
            placeholder={'tamanho da fonte'}
            onChangeText={text => setSizeFont(text)}
          />
        </InputArea>

        <Text>margin</Text>
        <InputArea>
          <Input
            value={marginFont}
            placeholder={'margin'}
            onChangeText={text => setMarginFont(text)}
          />
        </InputArea>

        <Button onPress={HandleClick}>
          <ButtonText>Enviar</ButtonText>
        </Button>
      </ContainerForm>
    </Container>
  );
};
