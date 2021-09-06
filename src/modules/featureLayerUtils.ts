import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Geometry from '@arcgis/core/geometry/Geometry';
import Graphic from '@arcgis/core/Graphic';

export function updateGeometry(graphic: Graphic, newGeometry: Geometry) {
  graphic.graphic.geometry = newGeometry;
  (graphic.graphic.layer as FeatureLayer)
    .applyEdits({
      updateFeatures: [graphic.graphic],
    })
    .then((results) => {
      console.log('updateGeometry', results);
    });
}
