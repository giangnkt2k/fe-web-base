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
    icon: 'el-icon-s-data',
    active: false,
    role: ['QAM']
  },
  {
    routerName: '',
    title: 'Users',
    icon: 'el-icon-user-solid',
    active: false,
    link: '/users',
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
    title: 'Department',
    icon: 'el-icon-suitcase-1',
    active: false,
    link: '/department',
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
    title: 'Your idea',
    icon: 'el-icon-document',
    active: false,
    link: '/idea',
    role: ['STAFF', 'QAM', 'QAC']
  }

]
