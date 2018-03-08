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
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        isLoading:false,
      }
    },
    computed: mapGetters([
      'agentsInfoList'
    ]),
    created(){
      let user = JSON.parse(sessionStorage.getItem('admin'))
      if(!user){
        this.$router.push({name:'Login'})
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
      this.$store.dispatch('initAgentsInfo',options)
      .then(userInfo => {
      }, err => {
        this.$notify({
          message: err,
          type: 'error'
        });
      })
    },
    methods: {
      //修改
      updateAdminAgentsInfo(){
        alert('正在开发中!')
      }
    },
  }
</script>
<style scoped>

</style>
