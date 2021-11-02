<template>
  <v-list>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ calc_bytes(product.capacity, {fixed: 0}) }}
        </v-list-item-title>
        <p v-if="product.seq_read">
          连续读取: {{ product.seq_read }} MB/s
        </p>
        <p v-if="product.seq_write">
          连续写入: {{ product.seq_write }} MB/s
        </p>
        <p v-if="product.iops_read">
          4K 随机读取: {{ product.iops_read }} IOPS
        </p>
        <p v-if="product.iops_write">
          4K 随机写入: {{ product.iops_write }} IOPS
        </p>
        <p v-if="product.endurance">
          使用寿命: {{ calc_bytes(product.endurance, {fixed: 0}) }}W
        </p>
      </v-list-item-content>
      <v-chip-group
        column
      >
        <v-chip v-if="product.flash" class="lime accent-4 black--text">
          {{ product.flash }}
        </v-chip>
        <v-chip v-if="product.if" class="cyan accent-4 black--text">
          {{ product.if }}
        </v-chip>
        <v-chip v-for="factor in product.form_factor" :key="factor" class="orange accent-4 white--text">
          {{ factor }}
        </v-chip>
      </v-chip-group>
    </v-list-item>
  </v-list>
</template>

<script>
import xbytes from 'xbytes'

export default {
  props: {
    product: {
      required: true
    },
    filter: String
  },
  data() {
    return {}
  },
  methods: {
    calc_bytes(num, options) {
      return xbytes(num, options)
    }
  }
}
</script>
