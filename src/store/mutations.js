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
  updateAdminAgentsInfoObj:{},//修改代理商信息Obj
  provinceDataList:[],//获取省
  cityDataList:[],//获取市
  countyDataList:[],//获取县
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
  },
  updateAdminAgentsInfoObj(state,id){
    state.updateAdminAgentsInfoObj = state.agentsInfoList.filter(item=>{
      if( item.sm_pi_ProxyInfoID == id ){
        return true;
      }else{
        return false;
      }
    })[0];
  },
  //获取省
  initProvinceData(state,data){
    state.provinceDataList = data;
  },
  //获取市
  initCityData(state,data){
    state.cityDataList = data;
  },
  //获取县
  initCountyData(state,data){
    state.countyDataList = data;
  },
};

export default {
  getters,
  state,
  mutations
}
