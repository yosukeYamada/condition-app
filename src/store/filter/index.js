export const filter = {
    namespaced: true,
    state: {
      depId : ''
    },
    mutations: {
      setDepId(state, depId) {
        state.depId = depId
      }
    },
    actions: {
      setDepId({commit}, depId) {
        console.log(depId)
        commit("setDepId", depId)
      }
    }
  }
  export default filter;