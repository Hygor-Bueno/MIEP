import React, {useEffect, useContext, useState} from 'react';
import {Container, Image, ImageBack} from './styled.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GridContext} from '../../context/GridContext.js';
import {ShopDepartmentContext} from '../../context/ShopDepartmentContext.js';
import {useNavigation} from '@react-navigation/native';
import {ProductContext} from '../../context/ProductContext.js';
import Api from '../../../Api.js';
import Loading from '../../components/Loading';
import clear from 'react-native-clear-app-cache';

export default ({navigation, route}) => {
  const {dispatch: gridDispatch} = useContext(GridContext);
  const {dispatch: shopDepDispatch} = useContext(ShopDepartmentContext);
  // const {dispatch: productDispatch} = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [offline, setOffline] = useState(false);
  const [text, setText] = useState(false);
  const nav = useNavigation();

  useEffect(async () => {
    // setOffline(true);
    let isActive = true;
    setLoading(true);
    const abortController = new AbortController();

    if (isActive) {
      try {
        let widthGrid = JSON.parse(await AsyncStorage.getItem('widthGrid'));
        let heightGrid = JSON.parse(await AsyncStorage.getItem('heightGrid'));
        let paddingGrid = JSON.parse(await AsyncStorage.getItem('paddingGrid'));
        let topGrid = JSON.parse(await AsyncStorage.getItem('topGrid'));
        let sizeFont = JSON.parse(await AsyncStorage.getItem('sizeFont'));
        let marginFont = JSON.parse(await AsyncStorage.getItem('marginFont'));
        let shop = await AsyncStorage.getItem('shop');
        let department = await AsyncStorage.getItem('department');
        let external = await AsyncStorage.getItem('external');
        let id = await AsyncStorage.getItem('id');

        if (widthGrid) {
          gridDispatch({
            type: 'setWidth',
            payload: {width: widthGrid},
          });
        }

        if (heightGrid) {
          gridDispatch({
            type: 'setHeight',
            payload: {height: heightGrid},
          });
        }

        if (paddingGrid) {
          gridDispatch({
            type: 'setPadding',
            payload: {padding: paddingGrid},
          });
        }

        if (topGrid) {
          gridDispatch({
            type: 'setTop',
            payload: {top: topGrid},
          });
        }

        if (marginFont) {
          gridDispatch({
            type: 'setMargin',
            payload: {margin: marginFont},
          });
        }

        if (sizeFont) {
          gridDispatch({
            type: 'setSize',
            payload: {size: sizeFont},
          });
        }

        if (shop && department && id && external) {
          shopDepDispatch({
            type: 'setShop',
            payload: {shop: shop},
          });

          shopDepDispatch({
            type: 'setDepartment',
            payload: {department: department},
          });
          shopDepDispatch({
            type: 'setId',
            payload: {id: id},
          });

          shopDepDispatch({
            type: 'setExternalShop',
            payload: {externalShop: external},
          });

          const response = await Api.POST_STATUS(
            {
              shop_id: shop,
              dept_id: department,
              app_id: id,
            },
            abortController.signal,
          );
          if (response.error) throw new Error(response.error);
          // let response = await Api.GET_MEDIA_DEPARTMENT(
          //   department,
          //   abortController.signal,
          // );

          // console.log(response, department)
          // if (!response.error) {
          //   productDispatch({
          //     type: 'setImage',
          //     payload: {image: response.data[0].file},
          //   });
          // }

          // let res = await Api.GETPRODUCTLIST(
          //   external,
          //   response.data[0].screen_id,
          //   abortController.signal,
          // );

          // if (!res.error) {
          //   productDispatch({
          //     type: 'setProduct',
          //     payload: {product: [...res.data]},
          //   });
          // }

          // if (res.error || response.error) {
          //   nav.navigate('Login');
          //   nav.navigate('Main');
          // }
          // setOffline(false);
          clear.clearAppCache(e => {
            console.log('limpou')
            setOffline(true)
          });
          clear.getAppCacheSize((value, unit) => {
            console.log(value)
          });
          return [
            nav.navigate('Login'),
            nav.navigate('Main'),
            (isActive = false),
            setOffline(false),
            abortController.abort(),
          ];
        } else {
          setOffline(true);
          nav.navigate('Login');
        }
      } catch (e) {
        console.log(e);
        setOffline(true);
      }
    }

    return [(isActive = false), abortController.abort()];
  }, []);


  return (
    <Container>
      {offline && <ImageBack source={require('../../assets/offline.png')} />}
      {loading && <Loading text={'carregando...'} />}
      <Image source={require('../../assets/MIEPP.png')} />
    </Container>
  );
};
