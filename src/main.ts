import { createApp } from 'vue'
import App from './App.vue'
import * as echarts from "echarts/core" 
import china from './map/json/china.json'
import { MapChart, EffectScatterChart, LinesChart } from 'echarts/charts'

const AppBase = createApp(App)
// @ts-ignore
echarts.registerMap('china', china)
echarts.use([MapChart, EffectScatterChart, LinesChart])

AppBase.config.globalProperties.echarts = echarts

AppBase.mount('#app')