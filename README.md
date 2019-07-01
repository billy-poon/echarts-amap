# ECharts Extension AMap

An echarts extension to support AMap(http://lbs.amap.com/), Ported from the offical echarts `extension-bmap`

> https://github.com/ecomfe/echarts/tree/master/extension/bmap

## Install

```bash
npm install -S echarts-amap
```

## Get Started

**Using Script Tag**

> See: [index.html](index.html) as example.

**Using Webpack**

```javascript
var echarts = require('echarts')
require('echarts-amap')

var echart = echarts.init(document.getElementById('map'))
echart.setOption({
  ... // see the example above
})
```
