import app = __app;

import { whenOnce } from '@arcgis/core/core/watchUtils';
import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';
import { tsx } from '@arcgis/core/widgets/support/widget';
import Widget from '@arcgis/core/widgets/Widget';
import AppViewModel from 'app/App/AppViewModel';
import { initFeatureTables } from './widgets';
import MapView from '@arcgis/core/views/MapView';

const CSS = {
  base: 'app',
  header: 'app--header',
  headerTitle: 'app--header-title',
  headerSearch: 'app--header-search',
  view: 'app--view',
  tables: 'app--tables',
};

@subclass('app/App')
export default class App extends Widget {
  // view model has no purpose here but more complex apps should have all logic and _init() contained therein
  @property({
    type: AppViewModel,
  })
  viewModel = new AppViewModel();

  @property({
    aliasOf: 'viewModel.view',
  })
  view!: esri.MapView | esri.SceneView;

  @property()
  title = 'SPIM';

  @property()
  searchViewModel: esri.SearchViewModel | undefined;

  constructor(properties: app.AppProperties) {
    super(properties);
    whenOnce(this, 'view', this._init.bind(this));
  }

  private async _init(): Promise<void> {
    const { view, searchViewModel } = this;

    setTimeout((): void => {
      view.container = document.querySelector('div[data-app-view]') as HTMLDivElement;
    }, 0);

    await view.when();

    const tablesContainer = document.querySelector('div[data-app-tables]') as HTMLDivElement;
    const calciteTabs = initFeatureTables(view as MapView);
    tablesContainer.appendChild(calciteTabs);
  }

  render(): tsx.JSX.Element {
    const { title } = this;
    return (
      <div class={CSS.base}>
        {/* view */}
        <div class={CSS.view} data-app-view=""></div>

        {/* tables */}
        <calcite-block collapsible heading="Feature Tables">
          <calcite-icon scale="s" slot="icon" icon="table"></calcite-icon>
          <div class={CSS.tables} data-app-tables=""></div>
        </calcite-block>
      </div>
    );
  }
}
