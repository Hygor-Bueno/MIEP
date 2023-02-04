import React, { useContext, useState, useEffect } from 'react';
import Video from 'react-native-video';
import Api from '../../../Api';
import {
  Container,
  ContainerProduct,
  Product,
  BackGroundImage,
  ProductList,
  Text,
  Image,
  ButtonEngine,
  TextPromo,
  ImagePri,
  ContainerImage,
} from './styled';
import { ShopDepartmentContext } from '../../context/ShopDepartmentContext';
import { GridContext } from '../../context/GridContext';
import { ProductContext } from '../../context/ProductContext';
import NetInfo from '@react-native-community/netinfo';
import ModalGrid from '../../components/ModalGrid';
import { Icon, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FileDowload, FileExist } from '../../util/FileDowload.js';
import RNFS from 'react-native-fs';
import clear from 'react-native-clear-app-cache';
import { Alert } from 'react-native';


export default ({ route, navigation }) => {
  const { state: gridState } = useContext(GridContext);
  const { state: storareState } = useContext(ShopDepartmentContext);
  // const {state: productState, dispatch: productDispatch} = useContext(ProductContext);
  const [file, setFile] = useState('');
  const [fileVideo, setFileVideo] = useState('');
  const [offline, setOffline] = useState(true);
  const [product, setProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [caughtAtSeconds, setCaughtAtSeconds] = useState();
  const [durationSeconds, setDurationSeconds] = useState(undefined);
  const [startAtSeconds, setStartAtSeconds] = useState(undefined);
  const [connState, setConnState] = useState(true);
  const [nextScreen, setNextScreen] = useState(undefined);
  const nav = useNavigation();
  const [load, setLoad] = useState(true);


  useEffect(async () => {
    let isActive = true;
    if (isActive) {
      try {
        clear.clearAppCache(e => {
          console.log('limpou')
        });
        clear.getAppCacheSize((value, unit) => {
          console.log(value)
        });
        setFile('')
        setFileVideo('')
        setProduct([])
        getScreen();
        console.log('try')
      } catch (e) {
        setOffline(true)
        console.log('catch')
      }
    }

    return [navigation.addListener('focus', () => {
      setLoad(!load);
    }), (isActive = false), setOffline(false)];
  }, [load, navigation, route]);

  useEffect(() => {
    let ping = 0;
    let time = setInterval(() => {
      let timer =
        new Date().getHours() * 3600 +
        new Date().getMinutes() * 60 +
        new Date().getSeconds();
      ping = ping + 1;
      // NetInfo.fetch().then(state => {
      //   if (!state.isConnected) {
      //     // setConnState(state.isConnected);
      //     console.log(state.isConnected)
      //   } else {

      //     // setConnState(state.isConnected);
      //   }
      // });

      if (
        caughtAtSeconds != undefined &&
        nextScreen != undefined &&
        timer + caughtAtSeconds >= nextScreen
      ) {
        // postRecord()
        // setFile(undefined)
        ping = 0;
        setDurationSeconds(undefined);
        setStartAtSeconds(undefined);
        getScreen();
      }
      // console.log(timer + caughtAtSeconds, parseInt(startAtSeconds) + parseInt(durationSeconds) + 1, nextScreen)
      if (
        timer + caughtAtSeconds >=
        parseInt(startAtSeconds) + parseInt(durationSeconds) + 1 &&
        durationSeconds != undefined
      ) {
        // postRecord()
        // setFile(undefined)
        ping = 0;
        setDurationSeconds(undefined);
        getScreen();
      }

      if (ping == 200) {
        ping = 0;
        getScreen();
        console.log("ping")
      }

    }, 1000);
    return () => {
      clearInterval(time);
    };
  });

  ///get Information Screen//////
  const getScreen = async () => {
    let isActive = true;
    const abortController = new AbortController();
    console.log('getscreen')
    if (isActive) {
      try {
        let response = await Api.GETSCREEN(
          storareState.shop,
          storareState.department,
          abortController.signal,
        );
        // console.log(response,"all")
        if (response.error) throw new Error(response.message);

        let timer =
          new Date().getHours() * 3600 +
          new Date().getMinutes() * 60 +
          new Date().getSeconds();

        // if (
        //   response.data.caught_at_seconds - timer + timer >=
        //     response.data.starts_at_seconds &&
        //   response.data.caught_at_seconds - timer + timer <=
        //     response.data.starts_at_seconds + response.data.duration_seconds
        // ) {
        setNextScreen(response.data.next_screen_seconds);
        setCaughtAtSeconds(response.data.caught_at_seconds - timer);
        setDurationSeconds(response.data.duration_seconds);
        setStartAtSeconds(response.data.starts_at_seconds);

        if (
          response.data.caught_at_seconds >= response.data.starts_at_seconds ||
          response.data.caught_at_seconds <=
          response.data.starts_at_seconds + response.data.duration_seconds
        ) {

          await getMediaFile(response.data.media_id);
          setOffline(false)

          response.data.type == 0 &&
            await getProduct(storareState.externalShop, response.data.screen_id);
        }
      } catch (e) {
        console.log('getscreen catch')
        setFile('')
        setFileVideo('')
        setProduct([])
        setOffline(true)
      }
    }

    return [abortController.abort(), (isActive = false)];
  };
  //////////////////////////

  ////mediaFile/////////////
  const getMediaFile = async mediaId => {
    let isActive = true;
    const abortController = new AbortController();

    try {
      if (isActive) {
        let response = await Api.GETFILE(mediaId, abortController.signal);
        console.log(response, "media")
        if (response.error) throw new Error(response.message);
        // if (response.error) {
        //   setFile('')
        //   setFileVideo('')
        //   setOffline(true)
        //   // if (productState.image && productState.listProduct) {
        //   //   return [
        //   //     setFile(`data:image/jpeg;base64,${productState.image}`),
        //   //     setProduct([...productState.listProduct]),
        //   //   ];
        //   // }
        //   return getScreen();
        // }

        if (
          response.data[0].name.includes('avi') ||
          response.data[0].name.includes('mp4')
        ) {
          if (await FileExist(response.data[0].name)) {
            setFileVideo(`file://${RNFS.ExternalDirectoryPath}/${response.data[0].name}`)
            return [abortController.abort(), (isActive = false)];
          }
          FileDowload(response.data[0].name);
          setFileVideo(
            `http://187.35.128.157:71/GLOBAL/Controller/MIEPP/uploads/${response.data[0].name}`,
          );
        } else {
          if (await FileExist(response.data[0].name)) {
            setProduct([]);
            setFileVideo('');
            setFile(`file://${RNFS.ExternalDirectoryPath}/${response.data[0].name}`)

            return [abortController.abort(), (isActive = false)];
          }
          setProduct([]);
          setFileVideo('');
          FileDowload(response.data[0].name);
          setFile(
            `http://187.35.128.157:71/GLOBAL/Controller/MIEPP/uploads/${response.data[0].name}`,
          );
        }
        return [abortController.abort(), (isActive = false), setOffline(false)];
      }

    } catch (e) {
      setFile('')
      setFileVideo('')
      setOffline(true)
      getScreen();
    }
    return [abortController.abort(), (isActive = false)];
  };
  ///////////////
  ////Product List/////////////
  const getProduct = async (shop, screen) => {
    try {
      let isActive = true;
      // let performance = performance.now();
      // console.log(performance)
      const abortController = new AbortController();
      // const id = setTimeout(() => abortController.abort(), 8000);
      if (isActive) {
        let response = await Api.GETPRODUCTLIST(
          shop,
          screen,
          abortController.signal,
        );
        // console.log(response,"product")
        // performance == 20000 && abortController.abort();
        if (response.error) throw new Error(response.message);
        // if (response.error) {
        // setFile('')
        // setFileVideo('')
        // setOffline(true)
        // // setProduct([...productState.listProduct]);
        // return getScreen();
        // }

        // productDispatch({
        //   type: 'setProduct',
        //   payload: {product: [...response.data]},
        // });
        setProduct([...response.data]);
      }

      // return [abortController.abort(), (isActive = false), clearTimeout(id)];
      return [abortController.abort(), (isActive = false), setOffline(false)];
    } catch (error) {
      // setProduct([...productState.listProduct]);
      setFile('')
      setFileVideo('')
      setOffline(true)
      getScreen();
    }
  };
  /////////////////
  return (
    <Container>
      <BackGroundImage source={require('../../assets/back.png')}>
        <ButtonEngine onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="cog" />
        </ButtonEngine>
        {modalVisible && <ModalGrid setModalVisible={setModalVisible} />}
        {/* <ImagePri source={{uri: `data:image/jpeg;base64,${productState.image}`}} /> */}
        <ContainerImage>
          {offline && <Image source={require('../../assets/offline.png')} />}
          {fileVideo.length > 0 && (
            <Video
              preventsDisplaySleepDuringVideoPlayback={false}
              resizeMode="cover"
              // controls
              repeat
              style={{
                flex: 1,
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 30,
              }}
              source={{ uri: `${fileVideo}` }}
            />
          )}

          {file.length > 0 && <Image source={{ uri: `${file}` }} />}

          <ContainerProduct
            width={
              gridState.widthGrid != '' ? `${gridState.widthGrid}%` : '60%'
            }
            padding={
              gridState.paddingGrid != '' ? `${gridState.paddingGrid}%` : '2%'
            }
            height={
              gridState.heightGrid != '' ? `${gridState.heightGrid}%` : '100%'
            }
            topp={gridState.topGrid != '' ? `${gridState.topGrid}%` : '10%'}>
            {
              product?.map(item => {
                return item.price_promo != 0
                  ? productPricePromo(item, gridState)
                  : productPrice(item, gridState);
              })
            }

            {/* Código antigo Não apagar até o outro código funcionar */}
            {/* {product?.map(item => {
              return item.price_promo != 0
                ? productPricePromo(item, gridState)
                : productPrice(item, gridState);
            })} */}

            {/* <ProductList
            keyExtractor={item => item.id}
            data={data}
            renderItem={({item}) =>
              item.price_promo != 0
                ? productPricePromo(item,gridState)
                : productPrice(item,gridState)
            }
          /> */}
          </ContainerProduct>
        </ContainerImage>
      </BackGroundImage>
    </Container>
  );
};

const productPricePromo = (item, gridState) => {
  // console.log('pro', gridState.sizeFont);
  // console.log('prom',item)
  return (
    <Product
      key={item.id}
      marg={gridState.marginFont != '' ? `${gridState.marginFont}%` : '2%'}>
      <TextPromo
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {item.id}
      </TextPromo>
      <TextPromo
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {item.description}
      </TextPromo>
      <TextPromo
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {ConvertPrice(item.price)}
      </TextPromo>
    </Product>
  );
};

const productPrice = (item, gridState) => {
  // console.log('pro', gridState.sizeFont);
  return (
    <Product
      key={item.id}
      marg={gridState.marginFont != '' ? `${gridState.marginFont}%` : '2%'}>
      <Text
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {item.id}
      </Text>
      <Text
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {item.description}
      </Text>

      <Text
        size={gridState.sizeFont != '' ? `${gridState.sizeFont}px` : '15px'}>
        {ConvertPrice(item.price)}
      </Text>
    </Product>
  );
};



const ConvertPrice = (price) => {
  let newPrice = String(price);
  let dividePrice;
  if (newPrice.includes(".")) {
    dividePrice = newPrice.split(".");
    if (dividePrice["1"].length == 1) {
      return `${price}0`
    }
    return `${price}`
  } else {
    return `${price}.00`
  }
}