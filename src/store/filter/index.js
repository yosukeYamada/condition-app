export const filter = {
    namespaced: true,
    state: {
      filter:{
        userName: "",
        depName: "",
        hireYear: "",
        hireMonth: "",
          
      }
    },
    mutations: {
      /**
     * 検索用の部署名をstateにセットする
     * @param {*} filterDepName 検索時に使用する部署名
     */
    setFilterDepName(state, filterDepName) {
        state.filter.depName = filterDepName;
      },
      /**
       * 検索用の入社年をstateにセットする
       * @param {*} filterHireYear 検索時に使用する入社年
       */
      setFilterHireYear(state, filterHireYear) {
        state.filter.hireYear = filterHireYear;
      },
      /**
       * 検索用の入社月をstateにセットする
       * @param {*} filterHireMonth 検索時に使用する入社月
       */
      setFilterHireMonth(state, filterHireMonth) {
        state.filter.hireMonth = filterHireMonth;
      },
      /**
       * 検索用のユーザー名をstateにセットする
       * @param {*} filterUserName 検索時に使用するユーザー名
       */
      setFilterUserName(state, filterUserName) {
        state.filter.userName = filterUserName;
      },
    },
    actions: {
       /**
     * 部署名を使用し、絞り込み検索する
     * @param {*} filterDepName 検索時に使用する部署名
     */
    setFilterDepName({ commit }, filterDepName) {
        commit("setFilterDepName", filterDepName);
      },
      /**
     * 入社年を使用し、絞り込み検索する
     * @param {*} filterHireYear 検索時に使用する入社年
     */
    setFilterHireYear({ commit }, filterHireYear) {
        commit("setFilterHireYear", filterHireYear);
      },
      /**
       * 入社月を使用し、絞り込み検索する
       * @param {*} filterHireMonth 検索時に使用する入社月
       */
      setFilterHireMonth({ commit }, filterHireMonth) {
        commit("setFilterHireMonth", filterHireMonth);
      },
      /**
       * ユーザー名を使用し、絞り込み検索する
       * @param {*} filterUserName 検索時に使用するユーザー名
       */
      setFilterUserName({ commit }, filterUserName) {
        commit("setFilterUserName", filterUserName);
      },
    }
  }
  export default filter;