<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="specs"
        :items-per-page="10"
        multi-sort
        class="elevation-1"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: '型号',
          value: 'model'
        },
        {
          text: '容量',
          value: 'capacity'
        },
        {
          text: '连续读取(MB/s)',
          value: 'seq_read'
        },
        {
          text: '连续写入(MB/s)',
          value: 'seq_write'
        },
        {
          text: '4K读(KIOPS)',
          value: 'iops_read'
        },
        {
          text: '4K写(KIOPS)',
          value: 'iops_write'
        },
        {
          text: '质保',
          value: 'endurance'
        }
      ]
    }
  },
  computed: {
    specs() {
      return this.$store.state.specs
    }
  }
}
</script>
