/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import 'core-js';
import {AppRegistry} from 'react-native';
import App from './src/home';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
