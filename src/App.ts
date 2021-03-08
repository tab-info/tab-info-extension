import Component, { hbs } from '@glimmerx/component';
import { PageInfo } from '../lib/types';
import './App.css';
import TabInfoWidget from './TabInfoWidget';

/**
 * The entry point component for the popup tab. Most responsibility
 * is delegated to the {@link TabInfoWidget} component
 * 
 * @alpha
 */
export default class App extends Component<{data: PageInfo}> {
  
  static template = hbs`
    <TabInfoWidget @tabInfo={{@data.tabInfo}} />
  `;
}
