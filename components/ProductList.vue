<template>
  <div>
    <v-col>
      <v-row
        v-for="(company, company_name, company_index) in model_by_company"
        :key="company_index"
        class="col-12"
      >
        <h1>{{ company_name }}</h1>
        <v-expansion-panels
          multiple
        >
          <v-expansion-panel v-for="(model, model_name, model_index) in company" :key="model_index">
            <v-expansion-panel-header>
              {{ model_name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="(product, product_index) in model"
              :key="product_index"
            >
              <Product :product="product" :filter="filter" />
              <v-divider v-if="product_index != model.length - 1" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  data () {
    return {
      opened_panels: [],
      filter: ''
    }
  },
  computed: {
    models() {
      return this.$store.state.models
    },
    model_by_company() {
      return this.$store.state.model_by_company
    }
  },
  methods: {
    open_all() {
      this.opened_panels = [...Array(this.models.length).keys()].map((k, i) => i)
    },
    close_all() {
      this.opened_panels = []
    }
  }
}
</script>
