import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/menu/Login'
import History from '../components/menu/History'
import Pengguna from '../components/menu/Pengguna'
import Rooms from '../components/menu/room/Rooms'
import Room from '../components/menu/room/Room'
import Team from '../components/menu/Team'
import Explore from '../components/menu/Explore'
import Profile from '../components/user/Profile'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
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
    component: Room
  },{
    path: '/team',
    name: 'Team',
    component: Team
  },{
    path: '/explore',
    name: 'Explore',
    component: Explore
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
