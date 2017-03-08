module.exports = require('echarts').extendComponentView({
  type: 'amap',

  render: function (aMapModel, ecModel, api) {
    var rendering = true;

    var amap = aMapModel.getAMap();
    var viewportRoot = api.getZr().painter.getViewportRoot();
    var coordSys = aMapModel.coordinateSystem;
    var moveHandler = function (type, target) {
      if (rendering) {
          return;
      }
      var offsetEl = viewportRoot.parentNode.parentNode.parentNode;
      var mapOffset = [
          -parseInt(offsetEl.style.left, 10) || 0,
          -parseInt(offsetEl.style.top, 10) || 0
      ];
      viewportRoot.style.left = mapOffset[0] + 'px';
      viewportRoot.style.top = mapOffset[1] + 'px';

      coordSys.setMapOffset(mapOffset);
      aMapModel.__mapOffset = mapOffset;

      api.dispatchAction({
          type: 'amapRoam'
      });
    };

    function zoomEndHandler() {
      if (rendering) {
          return;
      }
      api.dispatchAction({
          type: 'amapRoam'
      });
    }

    amap.off('movestart', this._oldMoveHandler);
    amap.off('zoomend', this._oldZoomEndHandler);
    amap.off('moveend', this._oldZoomEndHandler);
    amap.off('complete', zoomEndHandler)

    amap.on('movestart', moveHandler);
    amap.on('zoomend', zoomEndHandler);
    amap.on('moveend', zoomEndHandler);
    amap.on('complete', zoomEndHandler)

    this._oldMoveHandler = moveHandler;
    this._oldZoomEndHandler = zoomEndHandler;

    // var roam = aMapModel.get('roam');
    // if (roam && roam !== 'scale') {
    //     amap.enableDragging();
    // }
    // else {
    //     amap.disableDragging();
    // }
    // if (roam && roam !== 'move') {
    //     amap.enableScrollWheelZoom();
    //     amap.enableDoubleClickZoom();
    //     amap.enablePinchToZoom();
    // }
    // else {
    //     amap.disableScrollWheelZoom();
    //     amap.disableDoubleClickZoom();
    //     amap.disablePinchToZoom();
    // }

    rendering = false;
  }
});
