import React, {useEffect, useState, useContext} from 'react';
import {Picker} from 'native-base';
import {
  Container,
  ContainerImage,
  ContainerButton,
  ContainerPicker,
  Image,
  Button,
  ButtonMessage,
  ImageBack,
} from './styled';
import Api from '../../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {useNavigation} from '@react-navigation/native';
import {ShopDepartmentContext} from '../../context/ShopDepartmentContext';
import Loading from '../../components/Loading';

export default () => {
  const [shop, setShop] = useState([]);
  const [department, setDepartament] = useState([]);
  const [selectShop, setSelectShop] = useState(0);
  const [offline, setOffline] = useState(false);
  const [selectDepartment, setSelectDepartment] = useState(0);
  const nav = useNavigation();
  const {dispatch: deviceDispatch} = useContext(ShopDepartmentContext);
  const [loading, setLoading] = useState(false);

  //get department and shop
  useEffect(async () => {
    let isActive = true;
    setLoading(true);

    const abortController = new AbortController();

    const getShopDepartment = async () => {
      try {
        let response = await Api.GET_SHOP_DEPARTMENT(abortController.signal);

        if (response.error) throw new Error(response.message);

        let getDepartament = [];
        let getShop = [];

        for (let i = 0; response.data.length > i; i++) {
          if (
            response.data[i].external_index_description.includes(
              ' departamento',
            )
          )
            getDepartament.push(response.data[i]);
          else if (
            response.data[i].external_index_description.includes(' loja ')
          )
            getShop.push(response.data[i]);
        }
        setOffline(false);
        return {getShop, getDepartament};
      } catch (e) {
        setOffline(true);
      }
    };

    if (isActive) {
      try {
        let {getShop, getDepartament} = await getShopDepartment();
        setShop([...getShop]);
        setDepartament([...getDepartament]);
      } catch (e) {
        setOffline(true)
      }
    }

    return [(isActive = false), abortController.abort(), setLoading(false), setOffline(false)];
  }, []);
  /////////////

  //send information shop and departament asyncStorage
  async function handleClick() {
    let isActive = true;
    setLoading(true);
    const abortController = new AbortController();

    if (isActive && selectShop > 0 && selectDepartment > 0) {
      try {
        let external = shop.find(index => index.id == selectShop);
        await AsyncStorage.setItem('shop', JSON.stringify(selectShop));

        await AsyncStorage.setItem(
          'external',
          JSON.stringify(external.external_index),
        );

        await AsyncStorage.setItem(
          'department',
          JSON.stringify(selectDepartment),
        );

        await DeviceInfo.getAndroidId().then(async uniqueId => {
          deviceDispatch({type: 'setShop', payload: {shop: selectShop}});

          deviceDispatch({
            type: 'setExternalShop',
            payload: {externalShop: external.external_index},
          });

          deviceDispatch({
            type: 'setDepartment',
            payload: {department: selectDepartment},
          });

          deviceDispatch({type: 'setId', payload: {id: uniqueId}});

          await AsyncStorage.setItem('id', JSON.stringify(uniqueId));

          await Api.POST_STATUS(
            {
              shop_id: shop,
              dept_id: department,
              app_id: uniqueId,
            },
            abortController.signal,
          );
          setOffline(false)
          nav.navigate('Main');
        });
      } catch (e) {
        setOffline(true)
        console.warn('asyncStorage', e);
      }
    }

    return [(isActive = false), abortController.abort(), setLoading(false)];
  }
  /////

  return (
    <Container>
      {offline && <ImageBack source={require('../../assets/offline.png')} />}
      {loading && <Loading text={'carregando...'} />}
      <ContainerImage>
        <Image source={require('../../assets/MIEPP.png')} />
      </ContainerImage>

      <ContainerPicker>
        <Picker
          mode="dropdown"
          placeholderStyle={{color: '#bfc6ea'}}
          onValueChange={value => setSelectShop(value)}>
          <Picker.Item label="Loja" value="0" />
          {shop?.map(data => (
            <Picker.Item
              key={data.id}
              label={data.description}
              value={data.id}
            />
          ))}
        </Picker>

        <Picker
          mode="dropdown"
          placeholderStyle={{color: '#bfc6ea'}}
          onValueChange={value => setSelectDepartment(value)}>
          <Picker.Item label="Departamento" value="0" />
          {department?.map(data => (
            <Picker.Item
              key={data.id}
              label={data.description}
              value={data.id}
            />
          ))}
        </Picker>
      </ContainerPicker>

      <ContainerButton>
        <Button onPress={handleClick}>
          <ButtonMessage>Entrar</ButtonMessage>
        </Button>
      </ContainerButton>
    </Container>
  );
};
