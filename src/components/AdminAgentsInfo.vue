<template>
  <div id="wrap" class="clearfix">
    <h1 class="userClass">代理商信息</h1>

    <!--数据展示-->
    <el-table
      :data="agentsInfoList"
      highlight-current-row
      v-loading="isLoading"
      style="width: 100%;padding-top: 50px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="代理商编号:">
              <span>{{ props.row.sm_pi_ProxyInfoID}}</span>
            </el-form-item>
            <el-form-item label="代理商编号:">
              <span>{{ props.row.sm_pi_ProxyInfoID}}</span>
            </el-form-item>
            <el-form-item label="公司名称:">
              <span>{{ props.row.sm_pi_CompanyName}}</span>
            </el-form-item>
            <el-form-item label="代理商级别:">
              <span>{{ props.row.sm_pi_Level}}级代理</span>
            </el-form-item>
            <el-form-item label="代理商名称:">
              <span>{{ props.row.sm_pi_Name}}</span>
            </el-form-item>
            <el-form-item label="代理商手机号码:">
              <span>{{ props.row.sm_pi_Telephone}}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.sm_pi_Sex | getSex}}</span>
            </el-form-item>
            <el-form-item label="QQ:">
              <span>{{ props.row.sm_pi_QQ}}</span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.sm_pi_Email}}</span>
            </el-form-item>
            <el-form-item label="地址:">
              <span>{{ props.row.sm_pi_Address}}</span>
            </el-form-item>
            <el-form-item label="注册资金:">
              <span>{{ props.row.sm_pi_RegMoney}}万元</span>
            </el-form-item>
            <el-form-item label="注册时间:">
              <span>{{ props.row.sm_pi_RegTime}}</span>
            </el-form-item>
            <el-form-item label="营业执照号:">
              <span>{{ props.row.sm_pi_CertNo}}</span>
            </el-form-item>
            <el-form-item label="证件有效期 :">
              <span>{{ props.row.sm_pi_CertExpireTo}}</span>
            </el-form-item>
            <el-form-item label="营业执照扫描件 :">
              <img :src="item" alt="" v-for="item in props.row.sm_pi_CertImage"
                   style="width: 100px;height: 100px" v-show="props.row.sm_pi_CertImage.length">
            </el-form-item>
            <el-form-item label="税务登记号 :">
              <span>{{ props.row.sm_pi_FeeNo}}</span>
            </el-form-item>
            <el-form-item label="税务登记证扫描件 :">
              <img :src="item" alt="" v-for="item in props.row.sm_pi_FeeImage"
                   style="width: 100px;height: 100px" v-show="props.row.sm_pi_FeeImage.length">
            </el-form-item>
            <el-form-item label="提成比例:">
              <span>{{ props.row.sm_ai_SinglePay}}</span>
            </el-form-item>
            <el-form-item label="审核状态:">
              <span>{{ props.row.sm_pi_IsPass | getPass}}</span>
            </el-form-item>
            <el-form-item label="审核失败原因:" v-show="props.row.sm_pi_IsPass!=1">
              <span>{{ props.row.sm_pi_FailReason}}</span>
            </el-form-item>
            <el-form-item label="创建时间 :">
              <span>{{ props.row.sm_pi_CreateTime | getUseTime}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="代理商编号"
        prop="sm_pi_ProxyInfoID">
      </el-table-column>
      <el-table-column
        label="代理商名称"
        prop="sm_pi_Name">
      </el-table-column>
      <el-table-column
        label="审核状态"
      >
        <template slot-scope="scope">
          <span>{{scope.row.sm_pi_IsPass | getPass}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="代理商手机号码"
        prop="sm_pi_Telephone">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-show="scope.row.sm_pi_IsPass!=1"
            @click="updateAdminAgentsInfo(scope.row.sm_pi_ProxyInfoID)">修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--修改代理商信息-->
    <el-dialog title="修改代理商信息" :visible.sync="updateAdminAgentsInfoDialog">
      <el-form :model="updateAdminAgentsInfoObj">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_Name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" :label-width="formLabelWidth">
          <el-radio-group v-model="updateAdminAgentsInfoObj.sm_pi_Sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_Telephone" :disabled="isdisabled"></el-input>
        </el-form-item>
        <el-form-item label="固定电话区号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_FixPhone"></el-input>
        </el-form-item>
        <el-form-item label="QQ:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_QQ"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_Email"></el-input>
        </el-form-item>
        <el-form-item label="省:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminAgentsInfoObj.sm_pi_Provice" placeholder="请选择省"
                     @focus="changeProvince">
            <el-option
              v-for="item in provinceDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="市:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminAgentsInfoObj.sm_pi_City" placeholder="请选择市"
                     @focus="changeCity">
            <el-option
              v-for="item in cityDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县:" :label-width="formLabelWidth">
          <el-select v-model="updateAdminAgentsInfoObj.sm_pi_County" placeholder="请选择县"
                     @focus="changeCounty">
            <el-option
              v-for="item in countyDataList"
              :key="item.sm_af_AreaID"
              :label="item.sm_af_AreaName"
              :value="item.sm_af_AreaID">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_Address"></el-input>
        </el-form-item>
        <el-form-item label="注册时间:" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-date-picker
                v-model="updateAdminAgentsInfoObj.sm_pi_RegTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="注册资金:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_RegMoney" style="width: 200px;"></el-input>
          万元
        </el-form-item>
        <el-form-item label="营业执照号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_CertNo"></el-input>
        </el-form-item>
        <el-form-item label="证件有效期从:" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-date-picker
                v-model="updateAdminAgentsInfoObj.sm_pi_CertExpireFrom"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="证件有效期到:" :label-width="formLabelWidth">
          <template>
            <div class="block">
              <el-date-picker
                v-model="updateAdminAgentsInfoObj.sm_pi_CertExpireTo"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="营业执照扫描件:">
          <a href="javascript:;" class="file">上传文件
            <input type="file" name="" ref="upload" accept="image/*">
          </a>
          <img
            style="display: block"
            v-for="item in ImageURL1"
            width="280"
            :src="item"
            height="125"
            v-show="ImageURL1.length"
          >
        </el-form-item>
        <el-form-item label="税务登记号:" :label-width="formLabelWidth">
          <el-input v-model="updateAdminAgentsInfoObj.sm_pi_FeeNo"></el-input>
        </el-form-item>
        <el-form-item label="税务登记扫描件:">
          <a href="javascript:;" class="file">上传文件
            <input type="file" name="" ref="upload1" accept="image/*">
          </a>
          <img
            style="display: block"
            v-for="item in ImageURL2"
            width="280"
            :src="item"
            height="125"
            v-show="ImageURL2.length"
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateAdminAgentsInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateAdminAgentsInfoSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: '',
    data() {
      return {
        isLoading: false,
        updateAdminAgentsInfoDialog: false,
        formLabelWidth: '120px',
        ImageURL1: [],
        ImageURL2: [],
        isdisabled: true,
      }
    },
    computed: mapGetters([
      'agentsInfoList',
      'updateAdminAgentsInfoObj',
      'provinceDataList',
      'cityDataList',
      'countyDataList',
    ]),
    created() {
      this.initData()
    },
    methods: {
      initData() {
        let user = JSON.parse(sessionStorage.getItem('admin'))
        if (!user) {
          this.$router.push({name: 'Login'})
          return
        }
        //获取代理商信息
        let options = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "operateUserID": "",
          "operateUserName": "",
          "pcName": "",
          "proxyID": user.sm_pi_ProxyInfoID,
        };
        this.$store.dispatch('initAgentsInfo', options)
          .then(userInfo => {
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
      },
      //选择省
      changeProvince(v) {
        let getAreaProvice = {
          "areaPid": 0
        }
        this.$store.dispatch('initProvinceData', getAreaProvice)
      },
      //选择市
      changeCity() {
        if (!this.updateAdminAgentsInfoObj.sm_pi_Provice) {
          this.$notify({
            message: '请先选择省!!',
            type: 'error'
          });
          return
        }
        let getCity = {
          "areaPid": this.updateAdminAgentsInfoObj.sm_pi_Provice ? this.updateAdminAgentsInfoObj.sm_pi_Provice : ''
        }
        this.$store.dispatch('initCityData', getCity)
      },
      //选择县
      changeCounty() {
        if (!this.updateAdminAgentsInfoObj.sm_pi_Provice && !this.updateAdminAgentsInfoObj.sm_pi_City) {
          this.$notify({
            message: '请先选择省和市!!',
            type: 'error'
          });
          return
        }
        let getCounty = {
          "areaPid": this.updateAdminAgentsInfoObj.sm_pi_City ? this.updateAdminAgentsInfoObj.sm_pi_City : ''
        }
        this.$store.dispatch('initCountyData', getCounty)
      },
      //图片转二进制
      uploadImg(file) {
        return new Promise(function (relove, reject) {
          lrz(file)
            .then(data => {
              relove(data.base64.split(',')[1])
            })
        })
      },
      //添加图片
      uploaNode() {
        setTimeout(() => {
          if (this.$refs.upload) {
            this.$refs.upload.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload.files.length; i++) {
                this.uploadImg(this.$refs.upload.files[i]).then(data => {
                  this.$store.dispatch('uploadAdminImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        console.log(data)
                        this.ImageURL1.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
          if (this.$refs.upload1) {
            this.$refs.upload1.addEventListener('change', data => {
              for (var i = 0; i < this.$refs.upload1.files.length; i++) {
                this.uploadImg(this.$refs.upload1.files[i]).then(data => {
                  this.$store.dispatch('uploadAdminImgs', {
                    imageData: data
                  })
                    .then(data => {
                      if (data) {
                        this.ImageURL2.push(data.data);
                      } else {
                        this.$notify({
                          message: '图片地址不存在!',
                          type: 'error'
                        });
                      }
                    })
                })
              }
            })
          }
        }, 30)
      },
      //修改
      updateAdminAgentsInfo(id) {
        this.uploaNode()
        this.updateAdminAgentsInfoDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('updateAdminAgentsInfoObj', id);
        this.updateAdminAgentsInfoObj.sm_pi_Provice = '';
        this.updateAdminAgentsInfoObj.sm_pi_City = '';
        this.updateAdminAgentsInfoObj.sm_pi_County = '';
      },
      //修改提交
      updateAdminAgentsInfoSubmit() {
        let updateProxyInfo = {
          "loginUserID": "huileyou",
          "loginUserPass": "123",
          "data": {
            "sm_pi_ProxyInfoID": this.updateAdminAgentsInfoObj.sm_pi_ProxyInfoID,
            "sm_pi_Name": this.updateAdminAgentsInfoObj.sm_pi_Name,
            "sm_pi_Sex": this.updateAdminAgentsInfoObj.sm_pi_Sex,
            "sm_pi_Telephone": this.updateAdminAgentsInfoObj.sm_pi_Telephone,
            "sm_pi_PhoneCode": this.updateAdminAgentsInfoObj.sm_pi_PhoneCode,
            "sm_pi_FixPhone": this.updateAdminAgentsInfoObj.sm_pi_FixPhone,
            "sm_pi_QQ": this.updateAdminAgentsInfoObj.sm_pi_QQ,
            "sm_pi_Email": this.updateAdminAgentsInfoObj.sm_pi_Email,
            "sm_pi_Provice": this.updateAdminAgentsInfoObj.sm_pi_Provice,
            "sm_pi_City": this.updateAdminAgentsInfoObj.sm_pi_City,
            "sm_pi_County": this.updateAdminAgentsInfoObj.sm_pi_County,
            "sm_pi_Address": this.updateAdminAgentsInfoObj.sm_pi_Address,
            "sm_pi_RegTime": this.updateAdminAgentsInfoObj.sm_pi_RegTime,
            "sm_pi_RegMoney": this.updateAdminAgentsInfoObj.sm_pi_RegMoney,
            "sm_pi_CertNo": this.updateAdminAgentsInfoObj.sm_pi_CertNo,
            "sm_pi_CertExpireFrom": this.updateAdminAgentsInfoObj.sm_pi_CertExpireFrom,
            "sm_pi_CertExpireTo": this.updateAdminAgentsInfoObj.sm_pi_CertExpireTo,
            "sm_pi_CertImage": this.ImageURL1[0],
            "sm_pi_FeeNo": this.updateAdminAgentsInfoObj.sm_pi_FeeNo,
            "sm_pi_FeeImage": this.ImageURL2[0]
          }
        }
        this.$store.dispatch('UpdateAdminAgentsInfoSubmit', updateProxyInfo)
          .then(suc => {
            this.$notify({
              message: suc,
              type: 'success'
            });
            this.initData()
          }, err => {
            this.$notify({
              message: err,
              type: 'error'
            });
          })
        this.updateAdminAgentsInfoDialog = false;
      }
    },
  }
</script>
<style scoped>

</style>
