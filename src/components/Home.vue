<template>
  <div>
    <div class="navbar navbar-inverse">
      <div class="navbar-header">
        <a class="navbar-brand" href="javascript:;">代理商后台管理系统</a>

        <ul class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>

      <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>

        </ul>


        <ul class="nav navbar-nav navbar-right">


          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <!--<img src="assets/images/placeholder.jpg" alt="">-->
              <span>管理员</span>
              <i class="caret"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
              <li @click="getUser"><a href="javascript:;"><i class="icon-user-plus"></i>{{qiankeUser?qiankeUser:''}}</a>
              </li>
              <li @click="Quit"><a href="javascript:;"><i class="icon-switch2"></i>退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- /main navbar -->


    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main sidebar 左边导航栏开始-->
        <div class="sidebar sidebar-main">
          <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
              <div class="category-content">
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <!--<img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">-->
                  </a>
                  <div class="media-body">
                    <span class="media-heading text-semibold">欢迎您:{{qiankeUser?qiankeUser:''}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /user menu -->


            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
              <div class="category-content no-padding">

                <!-------------------------------------管理员------------------------------------------------------>


                <ul class="navigation navigation-main navigation-accordion">
                  <!-- Main -->
                  <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                  <!--境外查询-->
                  <li>
                    <a href="javascript:;"><i class=" icon-home"></i> <span>代理商后台管理</span></a>
                    <ul>
                      <li>
                        <router-link to="/home/adminAgentsInfo">代理商信息</router-link>
                      </li>
                      <li  v-show="userInfo.sm_pi_IsPass==1">
                        <router-link to="/home/adminPersonalBenefits">代理商收益</router-link>
                      </li>
                      <!--<li>-->
                        <!--<router-link to="/home/adminGroupTour">跟团游栏目管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminBusinessLicense">商户营业执照管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminProductMenu">产品线路总菜单</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                        <!--<router-link to="/home/adminSystemMenu">系统菜单管理</router-link>-->
                      <!--</li>-->
                      <!--<li>-->
                      <!--<router-link to="/home/adminCommentsType">评论类型管理</router-link>-->
                      <!--</li>-->
                    </ul>
                  </li>
                  <!-- /main -->
                </ul>
              </div>
            </div>
            <!-- /main navigation-->

          </div>
        </div>
        <!-- /main sidebar  左边导航栏结束-->
        <!--右边内容-->
        <div class="content-wrapper">

          <div class="content"
               :class="{ 'animated': transtionActive.isActive, 'fadeIn': transtionActive.isRotateInDownRight }">
            <!-- Page length options -->
            <!-- /page length options -->
            <router-view name="User"></router-view>

            <!-- Footer -->
            <!--<div class="footer text-muted">-->
            <!--&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>-->
            <!--</div>-->
            <!-- /footer -->
          </div>
        </div>
        <!--右边内容结束-->
        <!-- /dashboard content -->


        <!-- Footer -->
        <div class="footer text-muted">

        </div>
        <!-- /footer -->

      </div>
      <!-- /content area -->

    </div>
    <!-- /main content -->

  </div>
  <!-- /page content -->
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    data(){
      return {
        qiankeUser: '',
        userInfo:{}
//        isAdmin:true
      }
    },
    computed: mapGetters([
      'transtionActive',
    ]),
    created(){
      if (!sessionStorage.getItem('index')) {
        sessionStorage.setItem('index', '0')
      }
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('admin'));
      this.userInfo = JSON.parse(sessionStorage.getItem('admin'))
      if (!user) {
        this.$router.push({name: 'Login'})
      }
      this.qiankeUser = user.sm_pi_Name;
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (this.transtionActive.isActive && this.transtionActive.isRotateInDownRight) {
          this.$store.commit('setTranstionFalse')
        }
        setTimeout(() => {
          this.$store.commit('oPTranstionFalse')
        }, 10)
      }
    },
    methods: {
      //退出
      Quit(){
        this.$router.push({name: 'Login'})
      },
      //用户信息
      getUser(){
        this.$router.push({name: 'AdminAgentsInfo'})
      },

    }
  }
</script>
<style>
  .el-loading-spinner .circular {
    margin-left: 50%;
  }

  .edui-default {
    z-index: 3000 !important;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    overflow: hidden;
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

  .file {
    position: relative;
    display: inline-block;
    background: #409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    font-size: 12px;
    line-height: 20px;
  }

  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
