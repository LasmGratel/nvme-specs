<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-text-field
        v-model="search_criteria"
        light
        solo
        hide-details
        single-line
        prepend-icon="mdi-magnify"
        placeholder="Type keyword..."
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      criteria: '',
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: '产品列表',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: '产品对比',
          to: '/compare'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'PCIe/NVMe SSD 型号对比'
    }
  },
  computed: {
    search_criteria: {
      get () {
        return this.criteria
      },
      set (value) {
        this.$store.dispatch('updateSearch', value)
        this.criteria = value
      }
    }
  }
}
</script>
