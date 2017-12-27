import { AppRegistry } from 'react-native'
import StorybookUI from './storybook'
import App from '../src/App'
console.disableYellowBox = true
AppRegistry.registerComponent('sncf-le-panneau', () => StorybookUI)
export default StorybookUI
