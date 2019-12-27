<template>
    <nav>
        <!-- Navbar komponen -->
        <v-app-bar flat app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="text-uppercase grey--text">
           <router-link to="/" style="cursor: pointer"><span>GRIYA Pesona Indah</span></router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn v-if="loggedIn" @click="signOut" text color="grey">
            <span>Sign Out</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        <v-btn v-else text color="grey" router to="/login">
            <span>Sign In</span>
            <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
        </v-app-bar>
 
<!-- Navigasi dengan route masing-masing item -->
        <v-navigation-drawer v-model="drawer" app>
            <!-- avatar -->
            <v-row dense>
                <v-col v-if="loggedIn" class="mt-5 text-center">
                    <v-avatar size="100">
                    <img :src="user.image">
                    </v-avatar>
                    <p class="subtitle-1 mt-1">{{user.nama}}</p>
                </v-col>
                <v-col v-else class="mt-5 text-center">
                    <v-avatar size="100">
                    </v-avatar>
                    <p  class="subtitle-1 mt-1">Logged Out</p>
                </v-col>
            </v-row>
      <!-- List Menu -->
           <v-list  v-if="userIsKaryawan || userIsAdmin" dense>
            <v-list-item-group color="primary" class="mt-2">
                <v-list-item
                v-for="item in items"
                :key="item.text"
                router :to="item.route"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            <v-list-group
                    prepend-icon="mdi-account-box"
                >
                    <template v-slot:activator>
                    <v-list-item-title>Pengguna</v-list-item-title>
                    </template>
                    <v-list-item-group sub-group color="primary" class="mt-2">
                        <v-list-item
                        v-for="item in admins"
                        :key="item.text"
                        router :to="item.route"
                        >
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
            </v-list>
            <!-- List Menu -->
           <v-list  v-else dense>
            <v-list-item-group color="primary" class="mt-2">
                <v-list-item
                v-for="item in items"
                :key="item.text"
                router :to="item.route"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
            
        </v-navigation-drawer>

    </nav>
</template>

<script>
import firebase from 'firebase/app'
export default {
    data: () => ({
                loggedIn: false,
            drawer: false,
            
    }),
    computed: {
        user(){
            return this.$store.getters.loadedUser
        },
        admins(){
            let admins = [
               { text: 'Pelanggan', icon: 'mdi-face-profile', route: '/pelanggan' },
               { text: 'Karyawan', icon: 'mdi-face-profile', route: '/karyawan' },
            ]
            return admins
        },
        items () {
            let items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Explore', icon: 'mdi-map', route: '/explore' },
                { text: 'Login', icon: 'mdi-map-marker', route: '/login' },
                { text: 'Team', icon: 'mdi-account-group', route: '/team' },
            ]
            if (this.userIsAuthenticated && this.loggedIn) {
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Explore', icon: 'mdi-map', route: '/explore' },
                { text: 'History', icon: 'mdi-history', route: '/history' },
                { text: 'Team', icon: 'mdi-account-group', route: '/team' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                ]
            }
            if (this.userIsAdmin && this.loggedIn){
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Explore', icon: 'mdi-map', route: '/explore' },
                { text: 'History', icon: 'mdi-history', route: '/history' },
                { text: 'Rooms', icon: 'mdi-archive', route: '/rooms' },
                { text: 'Team', icon: 'mdi-account-group', route: '/team' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                { text: 'Bank', icon: 'mdi-bank', route: '/bank' },
                ]
            }
            if (this.userIsKaryawan && this.loggedIn){
                items = [
                { text: 'Home', icon: 'mdi-home', route: '/' },
                { text: 'Explore', icon: 'mdi-map', route: '/explore' },
                { text: 'Profile', icon: 'mdi-face-profile', route: '/user/profile' },
                ]
            }
            return items
        },
        userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsAdmin () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.role === 'admin'
      },
      userIsKaryawan () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.role === 'karyawan'
      },
    },
    methods:{
        //method logout
    async signOut(){
        try {
        const data = await  firebase.auth().signOut()
        console.log(data)
        this.$router.push('/login')
        } catch (err) {
            console.log(err)
        }


        }
    },
    //membuat atau mengubah session user
    created(){
        firebase.auth().onAuthStateChanged(user => {
            this.loggedIn = !!user
            if (user) {
                this.loggedIn = true
            } else {
                this.loggedIn = false
            }
        })
    }
}
</script>

<style>

</style>