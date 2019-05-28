import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import userConfig from './views/nav1/SysUserConfig.vue'
import RoleConfig from './views/nav1/SysRoleConfig.vue'
import SysCataLogConfig from './views/nav1/SysCataLogConfig.vue'
import ProjectNew from './views/nav1/ProjectNew'
import ProjectManage from './views/nav1/ProjectManage'
import CooperateCompanyManage from './views/nav1/CooperateCompanyManage'
import BuyerManage from './views/nav1/BuyerManage'
import ReceivedPaymentsStatistic from './views/nav1/ReceivedPaymentsStatistic'
import Progress from './views/nav1/Progress'
import test from './views/nav1/test'


let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    { path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/SysUserConfig', component: userConfig, name: 'userConfig' },
            { path: '/SysRoleConfig', component: RoleConfig, name: 'RoleConfig' },
            { path: '/SysCataLogConfig', component: SysCataLogConfig, name: 'SysCataLogConfig' },
            { path: '/ProjectNew', component: ProjectNew, name: 'ProjectNew' },
            { path: '/ProjectManage', component: ProjectManage, name: 'ProjectManage' },
            { path: '/CooperateCompanyManage', component: CooperateCompanyManage, name: 'CooperateCompanyManage' },
            { path: '/BuyerManage', component: BuyerManage, name: 'BuyerManage' },
            { path: '/ReceivedPaymentsStatistic', component: ReceivedPaymentsStatistic, name: 'ReceivedPaymentsStatistic' },
            { path: '/Progress', component: Progress, name: 'Progress' },
            { path: '/test', component: test, name: 'test' },
        ]
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;