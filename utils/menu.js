export default [
  {
    routerName: '',
    title: 'Feed',
    link: '/',
    icon: 'el-icon-coffee-cup',
    active: false,
    role: ['STAFF', 'ADMIN', 'QAM', 'QAC']
  },
  {
    routerName: '',
    title: 'Dashboard',
    link: '/dashboard',
    icon: 'el-icon-menu',
    active: false,
    role: ['ADMIN', 'QAM', 'QAC']
  },
  {
    routerName: '',
    title: 'User',
    icon: 'el-icon-user-solid',
    active: false,
    link: '/user',
    role: ['ADMIN']
  },
  {
    routerName: '',
    title: 'Academic year',
    icon: 'el-icon-date',
    active: false,
    link: '/academic-year',
    role: ['ADMIN']
  },
  {
    routerName: '',
    title: 'Category',
    icon: 'el-icon-set-up',
    active: false,
    link: '/category',
    role: ['QAM']
  },
  {
    routerName: '',
    title: 'Idea',
    icon: 'el-icon-document',
    active: false,
    link: '/idea',
    role: ['STAFF', 'QAM', 'QAC']
  }

]
