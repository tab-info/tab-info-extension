import { renderComponent } from '@glimmerx/core';
import App from './App';

const containerElement = document.getElementById('app');
if (!containerElement) {
  console.error('No container element found');
} else {
  renderComponent(App, containerElement);
}
