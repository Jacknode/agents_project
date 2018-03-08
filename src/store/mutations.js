/**
 * Created by leibo on 18/2/28.
 */
import getters from './getters'

const state = {
//初始化动画
  transtionActive: {
    isActive: false,
    isRotateInDownRight: false
  },
  agentsInfoList:[],//代理商信息
  adminPersonalBenefitsList:[],//代理商个人收益
};

const mutations = {
//初始化动画
  setTranstionFalse(state) {
    state.transtionActive = {
      isActive: false,
      isRotateInDownRight: false
    }
  },
  oPTranstionFalse() {
    state.transtionActive = {
      isActive: !state.transtionActive.isActive,
      isRotateInDownRight: !state.transtionActive.isRotateInDownRight
    }
  },
  initAgentsInfo(state,data){
    state.agentsInfoList = data;
  },
  initAdminPersonalBenefits(state,data){
    state.adminPersonalBenefitsList = data;
  }
};

export default {
  getters,
  state,
  mutations
}
