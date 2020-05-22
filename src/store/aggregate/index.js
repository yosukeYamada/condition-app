export const aggregate = {
  namespaced: true,
  state: {
    depId : 0,
    dayData: [],
    monthData: [],
    date: ''
  },
  mutations: {
    setDepId(state, depId) {
      state.depId = depId
    },
    setResponseDayData(state, data) {
      state.dayData = data
    },
    setResponseMonthData(state, data) {
      state.monthData = data
    },
    setSeletedDate(state, date) {
      state.date = date
    }
  },
  actions: {
    setDepId({commit}, depId) {
      commit("setDepId", depId)
    },
    setResponseDayData({commit}, data) {
      commit("setResponseDayData", data)
    },
    setResponseMonthData({commit}, data) {
      commit("setResponseMonthData", data)
    },
    setSeletedDate({commit}, date) {
      commit("setSeletedDate", date)
    }
  }
}

export default aggregate;