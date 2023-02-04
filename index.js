/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './config/ReactotronConfig';

AppRegistry.registerComponent(appName, () => App);
