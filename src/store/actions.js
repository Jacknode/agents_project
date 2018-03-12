/**
 * Created by leibo on 18/2/28.
 */
import axios from 'axios'

export default {
  //获取代理商信息
  initAgentsInfo({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ProxyInfo/Select', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            let resulte = data.data
            for (var i = 0; i < resulte.length; i++) {
              if (resulte[i].sm_pi_CertImage) {
                resulte[i].sm_pi_CertImage = resulte[i].sm_pi_CertImage.split(',');
              } else {
                resulte[i].sm_pi_CertImage = []
              }
              if (data.data[i].sm_pi_FeeImage) {
                resulte[i].sm_pi_FeeImage = resulte[i].sm_pi_FeeImage.split(',');
              } else {
                resulte[i].sm_pi_FeeImage = [];
              }
            }
            commit('initAgentsInfo', data.data)
            relove(data.data)
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //代理商个人收益
  initAdminPersonalBenefits({commit}, data) {
    return new Promise((relove, reject) => {
      axios.post('http://webservice.1000da.com.cn/ProxyInfo/ProxyInfoIncome', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initAdminPersonalBenefits', data.data);
            relove(Number(data.totalrows))
          } else {
            reject(data.resultcontent)
          }
        })
    })
  },
  //获取省
  initProvinceData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initProvinceData', data.data)
            relove()
          }
        })
    })
  },
  //获取市
  initCityData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCityData', data.data)
            relove()
          }
        })
    })
  },
  //获取县
  initCountyData({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/AreaFull/SelectProvice', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          var data = data.data;
          if (Number(data.resultcode) == 200) {
            commit('initCountyData', data.data)
            relove()
          }
        })
    })
  },

  //图片上传
  uploadAdminImgs(store, data) {
    return new Promise((relove, reject) => {
      axios.post('http://image.1000da.com.cn/PostImage/PostToService', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          relove(data.data)
        })
    })
  },
  //修改代理商信息
  UpdateAdminAgentsInfoSubmit({commit}, data) {
    return new Promise(function (relove, reject) {
      axios.post('http://webservice.1000da.com.cn/ProxyInfo/Update', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data=>{
          var data = data.data;
          if( Number(data.resultcode) == 200 ){
            relove(data.resultcontent);
          }else{
            reject(data.resultcontent)
          }
        })
    })
  }
}
