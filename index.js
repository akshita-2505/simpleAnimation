/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
//  react-native app run in web
//  https://github.com/joefazz/react-native-web-starter
// 1. npm install
// 2. npm run web


import 'core-js';
import {AppRegistry} from 'react-native';
import App from './mapRoad';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
