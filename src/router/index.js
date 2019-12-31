import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../components/menu/Login'
import History from '../components/menu/History'
import Pelanggan from '../components/menu/pengguna/Pelanggan'
import Karyawan from '../components/menu/pengguna/Karyawan'
import Rooms from '../components/menu/room/Rooms'
import Room from '../components/menu/room/Room'
import Reservasi from '../components/menu/res/Reservasi'
import Konfirmasi from '../components/menu/res/Konfirmasi'
import KonfirmasiPelanggan from '../components/menu/res/KonfirmasiPelanggan'
import ListRes from '../components/menu/res/HistoryReservasi'
import ListProRes from '../components/menu/res/ListReservasi'
import Team from '../components/menu/Team'
import Explore from '../components/menu/Explore'
import Tutorial from '../components/menu/Tutorial'
import Bank from '../components/menu/bank/Banks'
import Profile from '../components/user/Profile'
import AuthGuard from './auth-guard'



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
    path: '/pelanggan',
    name: 'Pelanggan',
    component: Pelanggan,
  },{
    path: '/karyawan',
    name: 'Karyawan',
    component: Karyawan,
  },{
    path: '/konfirmasi',
    name: 'Konfirmasi',
    component: Konfirmasi,
  },{
    path: '/konfirmasipelanggan',
    name: 'KonfirmasiPelanggan',
    component: KonfirmasiPelanggan,
  },{
    path: '/listreservasi',
    name: 'List',
    component: ListRes
  },{
    path: '/listprosesreservasi',
    name: 'Proses',
    component: ListProRes
  },{
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    beforeEnter: AuthGuard
  },{
    path: '/rooms/:id',
    name: 'Room',
    props: true,
    component: Room
  },{
    path: '/rooms/:id/reservasi',
    name: 'Reservasi',
    props: true,
    component: Reservasi,
    beforeEnter: AuthGuard
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
    component: Bank,
    beforeEnter: AuthGuard
  },{
    path: '/user/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },{
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
