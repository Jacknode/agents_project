/**
 * Created by leibo on 18/2/28.
 */
//登录
import Login from '@/components/Login'
import Home from '@/components/Home'
//代理商信息
import AdminAgentsInfo from '@/components/AdminAgentsInfo'
//个人收益
import AdminPersonalBenefits from '@/components/AdminPersonalBenefits'
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    components: {
      default: Home
    },
    children:[
      //代理商信息
      {
        path: 'adminAgentsInfo',
        components: {
          default: Home,
          User: AdminAgentsInfo
        },
        name: 'AdminAgentsInfo'
      },
      //个人收益
      {
        path: 'adminPersonalBenefits',
        components: {
          default: Home,
          User: AdminPersonalBenefits
        },
        name: 'AdminPersonalBenefits'
      },
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { name: 'Login' }
  },
]
