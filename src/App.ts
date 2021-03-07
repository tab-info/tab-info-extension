import Component, { hbs } from '@glimmerx/component';
import { PageInfo } from '../lib/types';
import './App.css';
import TabInfoWidget from './TabInfoWidget';

export default class App extends Component<{data: PageInfo}> {
  
  static template = hbs`
    <TabInfoWidget @tabInfo={{@data.tabInfo}} />
  `;
}
