import models from '~/static/models.json'

function getModelsByCompany(models) {
  const ret = {}
  for (const model in models) {
    if (ret[model.split(' ')[0]] === undefined) {
      ret[model.split(' ')[0]] = {}
    }
    ret[model.split(' ')[0]][model] = models[model]
  }
  return ret
}

export const state = () => ({
  models,
  model_by_company: getModelsByCompany(models),
  counter: 0,
  search_result: []
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  updateSearch(state, modelByCompany) {
    state.model_by_company = modelByCompany
  }
}

export const actions = {
  updateSearch({ commit }, criteria) {
    if (criteria.trim() === '') {
      commit('updateSearch', getModelsByCompany(models))
      return
    }
    const options = {
      includeScore: true
    }
    // eslint-disable-next-line no-undef
    const fuse = new Fuse(Object.keys(models), options)
    const result = fuse.search(criteria)
    const temp = {}
    for (const item of result) {
      temp[item.item] = models[item.item]
    }
    commit('updateSearch', getModelsByCompany(temp))
  }
}
