import esriConfig from '@arcgis/core/config';
import MapView from '@arcgis/core/views/MapView';
import SearchViewModel from '@arcgis/core/widgets/Search/SearchViewModel';
import App from 'app/App';
import { initLayerPopupTemplates, initWidgets } from './widgets';
import WebMap from '@arcgis/core/WebMap';
import { applyPolyfills, defineCustomElements } from '@esri/calcite-components/dist/loader';

applyPolyfills().then(() => {
  defineCustomElements(window);
});

esriConfig.assetsPath = './assets';

const map = new WebMap({
  portalItem: {
    id: '34e9370cb7b94c9589d36ba5fddacea4',
  },
});

const view = new MapView({
  map: map,
  ui: {
    components: ['zoom'],
  },
  center: [103.82, 1.35],
  zoom: 12,
});

const app = new App({
  view,
  title: 'SPIM Web Map',
  searchViewModel: new SearchViewModel({
    includeDefaultSources: true,
  }),
  container: document.createElement('div'),
});

view.when(() => {
  initWidgets(view);
  initLayerPopupTemplates(view as MapView);
});

document.body.append(app.container);
