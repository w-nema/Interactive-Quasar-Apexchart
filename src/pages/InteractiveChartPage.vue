<template>
  <q-page padding>

    <q-card>
      <q-card-section class="column flex-center full-width">

        <div class="row justify-center text-center ">
          <div class="text-h4 text-center">
            Interactive Charts
          </div>
          <div class="q-ml-md">
            <q-btn-group outline>
              <q-btn @click="chartCount++" class="q-px-none" icon="add" />
              <q-btn @click="chartCount--" class="q-px-none" icon="remove" />
            </q-btn-group>
          </div>
        </div>

        <!-- interactive charts -->
        <div class="row q-gutter-md flex-center fit col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
          <InteractiveChartCard
            style="min-width: 300px;"
            class="col-grow"
            v-for="(chart, idx) in chartCount"
            :key="idx"
            :idx="idx"
            :metrics="metrics"
            :cfg="cfg"
          />
        </div>

        <div class="text-center red">
          Disclaimer: All numbers at this time are either random or made up for demo purposes.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import InteractiveChartCard from '../components/InteractiveChartCard.vue'
import { metrics } from '../../data/metrics.js'
import { useQuasar } from 'quasar'

const
  $q = useQuasar(),
  chartCount = ref(2),
  cfg = ref({
    title: 'Interactive Chart',
    height: 300,
    width: '100%'
  })

onMounted(() => {
  $q.notify({
    message: 'Disclaimer: All numbers at this time are either random or made up for demo purposes.',
    icon: 'warning',
    color: 'purple'
  })
})

</script>
<style scoped>
.settings>div {
  border: 1px solid lightgray;
}

.selected {
  color: red;
}

.q-card {
  margin-bottom: 1em;
}
</style>

