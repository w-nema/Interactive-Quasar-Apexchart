



<template>
  <q-card>
    <q-card-section>
      <apexchart :series="chartCfgActual.series" :options="chartCfgActual.options"
        :type="chartCfgActual?.options?.chart?.type || 'bar'" :width="chartCfgActual.options?.chart?.width || '100%'"
        :height="chartCfgActual.options?.chart?.height || 300" ref="chartRef">
      </apexchart>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { colors } from 'quasar'
const
  props = defineProps(['chartCfg']),
  chartRef = ref(),
  colorShades = () => {
    /**
     * Important Notes:
     * 1. chartCfg.useGroupColors must equal true for this to be called
     * 2. chartCfg.series must be ordered by group (consecutive same group members)
     */
    //console.log('ChartCard colorShades')
    //e.g. group = ['Q1','Q1','Q2','Q2']
    const
      //ApexChart defaults
      paletteColors = ['#008FFB', '#EA3546', '#4CAF50', '#A300D6', '#5A2A27', '#3F51B5'],
      newColors = [],
      groupsAr =  props.chartCfg.series.map(i => i.group), //sub-series-array
      groupsDistinctCount = new Set(groupsAr).size,
      lightenPercent = 15, // Math.min(10, Math.round(50 / groupsDistinctCount)),
      groupsArLen = groupsAr.length

    let
      lightenIndex = 1,
      last_gp = '',
      pIdx = 0, //paletteColors Index
      pColor = paletteColors[0]
    for (let ii = 0; ii < groupsArLen; ii++) {
      let this_gp = groupsAr[ii]            //e.g. 'Q1'
      if (this_gp !== last_gp) {
        pColor = paletteColors[pIdx++]
        newColors.push(pColor)
        lightenIndex = 1
        last_gp = this_gp
        continue
      }
      newColors.push(colors.lighten(pColor, lightenIndex++ * lightenPercent))
      last_gp = groupsAr[ii]
    }
    //console.log('newColors:', newColors)
    return newColors
  },
  chartCfgDefault = ref({
    series: [],   //data
    options: {
      colors: props.chartCfg.series?.some(i => typeof i.group !== 'undefined') ? colorShades() : undefined,
      xaxis: {},  //data if needed (e.g. donut n/a)
      chart: {
        id: Math.round(10000 * Math.random()),
        foreColor: '#afafaf',
        toolbar: { show: false },
        stacked: props.chartCfg.series?.some(i => typeof i.group !== 'undefined') || false//check if chartCfg series has group
      },
      tooltip: {
        fillSeriesColor: true,
        inverseColor: true,
        theme: true
      },
      xaxis: {
        title: {
          text: 'Measured Object'
        }
      },
      yaxis: {
        title: {
          text: 'Count'
        }
      },
      legend: {
        horizontalAlign: 'center',
        position: 'top'
      },
      colors: props.chartCfg.useGroupColors ? colorShades() : undefined
    },
  })
//Object.assign does not deep clone
const chartCfgActual = {
  series: props.chartCfg.series,
  options: Object.assign(chartCfgDefault.value.options, props.chartCfg.options)
}

</script>
