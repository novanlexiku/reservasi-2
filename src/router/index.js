import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/menu/Login'
import History from '../components/menu/History'
import Pengguna from '../components/menu/Pengguna'
import Rooms from '../components/menu/room/Rooms'
import Room from '../components/menu/room/Room'
import Reservasi from '../components/menu/res/Reservasi'
import Team from '../components/menu/Team'
import Explore from '../components/menu/Explore'
import Bank from '../components/menu/bank/Banks'
import Profile from '../components/user/Profile'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/history',
    name: 'History',
    component: History
  },{
    path: '/pengguna',
    name: 'Pengguna',
    component: Pengguna
  },{
    path: '/rooms',
    name: 'Rooms',
    component: Rooms
  },{
    path: '/rooms/:id',
    name: 'Room',
    props: true,
    component: Room
  },{
    path: '/rooms/:id/reservasi',
    name: 'Reservasi',
    props: true,
    component: Reservasi
  },{
    path: '/team',
    name: 'Team',
    component: Team
  },{
    path: '/explore',
    name: 'Explore',
    component: Explore
  },{
    path: '/bank',
    name: 'Bank',
    component: Bank
  },{
    path: '/user/profile',
    name: 'Profile',
    component: Profile
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
