import RNFS from 'react-native-fs';

export async function FileDowload(name) {
    console.log(RNFS.ExternalDirectoryPath)
 await RNFS.downloadFile({
    fromUrl: `http://187.35.128.157:71/GLOBAL/Controller/MIEPP/uploads/${name}`,
    toFile: `${RNFS.ExternalDirectoryPath}/${name}`,
  })
    .promise.then(() => {console.log('foi')})
    .catch(err => console.log('a', err));
}

export async function FileExist(name) {
  let file = false;
 await RNFS.exists(
    `${RNFS.ExternalDirectoryPath}/${name}`,
  ).then(exist => {
    if (exist) {
      return (file = true);
    }
  });
  return file;
}
