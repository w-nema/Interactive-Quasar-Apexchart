<template>
  <q-page padding>
    <p>
      These charts were mostly copied from <a href="https://apexcharts.com/vue-chart-demos/">https://apexcharts.com/vue-chart-demos/</a>
    </p>

    <div class="row q-gutter-md flex-center fit col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
      <ChartCard
            style="min-width: 300px;"
            class="col-grow"
            v-for="chartCfg in otherChartsCfg"
            :chartCfg="chartCfg"
          />
    </div>
  </q-page>
</template>

<script setup>
import ChartCard from '../components/ChartCard.vue'
import { otherChartsCfg } from '../../data/otherChartsCfg.js'
</script>
