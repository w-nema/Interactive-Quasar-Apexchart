<template>
  <q-card>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-btn-dropdown class="fit" color="teal" outline :label="'Interactive Chart ' + (1 + idx)"
            >
            <q-list bordered padding>
              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label>Group Colors?</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle dense color="blue" v-model="groupColors"  @update:model-value="refreshChart" />
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label>Stack?</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle dense color="blue" v-model="chartOptions.chart.stacked" @update:model-value="refreshChart" />
                </q-item-section>
              </q-item>

              <q-item tag="label" v-ripple>
                <q-item-section>
                  <q-item-label>Chart type</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-select dense v-model="chartType" :options="['bar', 'column', 'line', 'area']" />
                </q-item-section>
              </q-item>

              <q-expansion-item :header-class="index===0?'text-red':index===1?'text-green':'text-blue'" group="accordion" v-for="(lookupItem, index) in Object.keys(lookup)" :key="item" :label="lookup[lookupItem].label"
                default-closed>
                <q-item v-for="flag in get_flags(lookupItem)" :key="flag.value" v-ripple dense>
                  <q-item-section>
                    <q-checkbox v-model="lookupModel[lookupItem]" :label="flag.label" :val="flag.value"
                      indeterminate-value="not_answered" dense keep-color @update:model-value="refreshChart" />
                    <div v-if="flag.description">
                      <q-item-label caption>{{ flag.description }}</q-item-label>
                      <q-separator spaced />
                    </div>
                  </q-item-section>


                </q-item>
              </q-expansion-item>
            </q-list>
          </q-btn-dropdown>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      <apexchart
        :height="cfg.height || 300"
        :options="chartOptions"
        :series="series"
        width="100%"
        ref="chartRef"
        type="bar"
      />

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { colors } from 'quasar'

const
  props = defineProps(['idx', 'metrics', 'cfg']),
  lookup = props.metrics.schema,
  metricData = props.metrics.data,
  groupColors = ref(true),
  chartRef = ref(),
  refreshChart = () => {
    chartOptions.value.colors = groupColors.value ? colorShades() : undefined
    chartRef.value.updateOptions(chartOptions.value)
  },
  chartType = ref('bar'),
  isStacked = ref(true),
  lookupModel = ref({
    aggs: ["yr", "mo", "wk"],
    cats: ["mo101", "mo109", "mo107"],
    metrics: ["exists", "visits", "interactions", "duration"]
  }),
  xaxis = computed(() => lookupModel.value.cats?.map(i => lookup.cats.flags.find(c => c.value === i).label)),
  series = computed(() => {
    let ret = []
    for (let agg of lookupModel.value.aggs) {
      for (let metric of lookupModel.value.metrics) {
        let data = []
        for (let cat of lookupModel.value.cats) {
          let metricKey = cat + '_' + metric
          data.push(metricData[metricKey][aggFlagIndex(agg)])
        }
        ret.push({
          name: `${agg}_${metric}`,
          data,
          group: agg,
          type: chartType.value
        })
      }
    }
    //console.log('series ret:', JSON.stringify(ret))
    return ret
  }),
  colorShades = () => {
    /**
     * Important Notes:
     * series must be ordered by group (consecutive same group members)
     */
    //console.log('interactiveChartCard colorShades')
    //e.g. group = ['Q1','Q1','Q2','Q2']
    const
      //ApexChart defaults
      paletteColors = ['#008FFB', '#EA3546', '#4CAF50', '#A300D6', '#5A2A27', '#3F51B5'],
      newColors = [],
      groupsAr = series.value.map(i => i.group), //sub-series-array
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
    ////console.log('newColors:', newColors)
    return newColors
  },
  chartOptions = ref({
    chart: {
      id: props.idx,
      stacked: true,//isStacked.value,
      toolbar: { show: true }
    },
    xaxis: {
      categories: xaxis,
      title: {
        text: 'Measured Object'
      }
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    title: {
      text: 'Time-Aggregated Metrics',
      position: 'bottom'
    },
    colors: groupColors.value ? colorShades() : undefined
  })
//////////////////////////// actions ////////////////////////////
function aggFlagIndex(flagKey) {
  return lookup.aggs.flags.findIndex(i => i.value === flagKey)
}
function get_flags(lookupKey) {
  return lookup[lookupKey].flags
}
</script>
