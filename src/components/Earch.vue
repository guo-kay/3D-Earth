<script setup lang="ts">
import { reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import 'echarts-gl'
import starfield from '../assets/starfield.jpg'
import world from '../assets/earth.jpg'

// @ts-ignore
const { proxy } = getCurrentInstance()

// 世界地图
const worldMapChart = proxy.echarts.init(document.createElement('canvas'), null, { width: 4096, height: 2048 });
worldMapChart.setOption({
  geo: {
    show: true, map: 'china',
    top: 0,  left: 0, right: 0,  bottom: 0,
    boundingCoords: [[-180, 90], [180, -90]],
    itemStyle: {
        areaColor: 'rgba(0,0,0,0)'
    },
    regions: [
        {
          name: '南海诸岛', 
          itemStyle: {
            opacity: 0
          }
        }
    ]
  },
  series: [
    {
      name: '地球数据标点',
      type: 'effectScatter',   
      coordinateSystem: 'geo',
      symbol: 'circle',
      symbolSize: 10,
      data: [
        {
          name: '南宁',
          value: [108.324994, 22.810701]
        },
        {
          name: '拉萨',
          value: [91.11,29.97]
        },
        {
          name: '日照',
          value: [119.46,35.42]
        },
        {
          name: '丹东',
          value: [124.37,40.13]
        },
        {
          name: '乌鲁木齐',
          value: [87.38, 43.43]
        }
      ],
      label: {
        formatter: '{b}',
        position: 'right',
        show: false
      },
      itemStyle: {
        color: 'red'
      }
    },
    {
      name: '地球弹道线路图',
      type: 'lines',
      coordinateSystem: 'geo',
      polyline: true,
      effect: {
        constantSpeed: 20,
        show: true,
        trailLength: 0.1,
        symbolSize: 10
      },
      lineStyle: {
        color: 'yellow',
        width: 3,
        curveness: 0.1
      },
      zlevel: 1,
      data: [
        {
          name: '新疆航线',
          coords: [[124.37,40.13], [87.38, 43.43]]
        }
      ]
    }
  ]
})

// 点击事件
worldMapChart.on('click', (event: any) => {
  console.log(event)
  switch(event.componentType){
    case 'geo':
      alert(event.name)
      break
    case 'series':
      alert(event.data.name)
      break
  }
})


// 函数
const methods = reactive({
  initChart(){
    const rootDiv = document.getElementById('echarts')
    let myEcharts = proxy.echarts.init(rootDiv)
    myEcharts.setOption({
      backgroundColor: '#000',
      globe: {
        baseTexture: world,
        environment: starfield,
        displacementScale: 10,
        shading: 'color',
        viewControl: {
          minDistance: 10,
          maxDistance: 140,
          targetCoord: [116.46, 39.92],
          autoRotateSpeed: 1
        },
        realisticMaterial: {
          roughnessAdjust: 0
        },
        layers: [
          {
            show: true,
            type: 'blend',
            texture: worldMapChart,
            intensity: 1,
            distance: 0
          }
        ]
      }
    })
  },
  dispose(){
      
  }
})

// 挂靠钩子
onMounted(() => {
  methods.initChart()
})
</script>

<template>
  <div id='echarts'></div>
</template>

<style scoped>
#echarts{
  width: 100%;
  height: 60em;
}
</style>