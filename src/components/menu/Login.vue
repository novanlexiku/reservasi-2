<template>
    <div id="login">
        
        <section>
            <div class="col1">
                <h1>GRIYA PESONA INDAH</h1>
                <p>Selamat datang di Griya Pesona Indah, Pesan tempat yang nyaman untuk menginap. </p>
            </div>
            <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">

                <!-- form login -->
                <v-form v-if="showLoginForm" @submit.prevent>
                    <h1>Welcome Back</h1>
                    <v-text-field label="Email" v-model.trim="loginForm.email" id="email1" prepend-icon="mdi-email" :rules="emailRules" ></v-text-field>
                    <v-text-field label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model.trim="loginForm.password" id="password1" prepend-icon="mdi-textbox-password">
                    </v-text-field>
                    <button @click="login" class="button" :loading="loading">Log In</button>
                    <div class="extras">
                        <a @click="togglePasswordReset">Lupa Password</a>
                        <a @click="toggleForm">Daftar untuk berlangganan</a>
                    </div>
                </v-form>

                <!-- form daftar -->
                <v-form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h1>Mulai Berlangganan</h1>
                    <v-text-field label="Email" v-model.trim="signupForm.email" id="email2" prepend-icon="mdi-email" :rules="emailRules"></v-text-field>
                    
                    <v-text-field label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model.trim="signupForm.password"
                    id="password2" prepend-icon="mdi-textbox-password" 
                    :rules="inputRules"></v-text-field>

                    <v-text-field label="Confirm Password"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    v-model.trim="signupForm.confirmPassword"
                    id="password3" prepend-icon="mdi-textbox-password" 
                    ></v-text-field>
                    <v-text-field label="Nama" v-model.trim="signupForm.nama" id="nama" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
                    <v-btn raised class="primary ml-8" @click="onPickFile">Upload Image</v-btn>
                    <input
                      type="file"
                      ref="fileInput"
                      style="display:none"
                      accept="image/*"
                      :rules="imageRules"
                      @change="onFilePicked">
                    <div class="ml-8">
                    <img height="200" width="300" :src="imageUrl" >
                    </div>
                    <button @click="signup" class="button mt-3" :loading="loading">Daftar</button>
                    <div class="extras">
                        <a @click="toggleForm">Kembali ke Login</a>
                    </div>
                </v-form>

                <!-- form lupa password -->
                <v-form v-if="showForgotPassword" @submit.prevent class="password-reset">
                    <div v-if="!passwordResetSuccess">
                        <h1>Reset Password</h1>
                        <p>Kami akan mengirimkan Anda email untuk mengatur ulang kata sandi Anda</p>
                        <v-text-field label="Email" v-model.trim="passwordForm.email" id="email3" prepend-icon="mdi-email" :rules="emailRules"></v-text-field>
                        <button @click="resetPassword" class="button" :loading="loading">Submit</button>
                        <div class="extras">
                            <a @click="togglePasswordReset">Back to Log In</a>
                        </div>
                    </div>
                    <div v-else>
                        <h1>Email telah dikirim</h1>
                        <p>periksa email Anda untuk tautan untuk mengatur ulang kata sandi Anda</p>
                        <button @click="togglePasswordReset" class="button">Kembali ke login</button>
                    </div>
                </v-form>
                <!-- Alert -->
                <transition nama="fade">
                    <div v-if="error" class="error-msg">
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                image:null,
                imageUrl:'',
                role:'pelanggan',
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    email: '',
                    password: '',
                    confirmPassword: '',
                    nama: '',
                    
                },
                passwordForm: {
                    email: ''
                },
                show: false,
                show2: false,
                showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: '',
                // Rules input + rules date
                inputRules:[
                        v => !!v || 'Input is required',
                        v => (v && v.length >= 5) || 'Input must be more than 5 characters',
                        ],
                // email rules menggunakan regex ( regular expresion)
                emailRules:[
                v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(v) || 'Invalid e-mail.'}
                ],
                imageRules: [
                    value => !value || value.size < 10000000 || 'Image size should be less than 10 MB!',
                ],
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            error (){
                return this.$store.getters.error
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined ){
                    this.$router.push('/')
                }
            }
        },
        methods: {
            toggleForm() {
                this.errorMsg = ''
                this.showLoginForm = !this.showLoginForm
            },
            togglePasswordReset() {
                if (this.showForgotPassword) {
                    this.showLoginForm = true
                    this.showForgotPassword = false
                    this.passwordResetSuccess = false
                } else {
                    this.showLoginForm = false
                    this.showForgotPassword = true
                }
            },
            //method login
            login(){
                const user = {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                    }
                this.$store.dispatch('signUserIn', user)
            },
            //method daftar
            signup(){
                    const user = {
                    email: this.signupForm.email,
                    password: this.signupForm.password,
                    nama: this.signupForm.nama,
                    image: this.image,
                    role:this.role
                    }
                this.$store.dispatch('signUserUp', user)
            },
            //method reset pass
            resetPassword(){
                const user = {
                    email: this.passwordForm.email
                }
                this.$store.dispatch('resetPassword', user)
            },
            onDismissed (){
                this.$store.dispatch('clearError')
            },
            onPickFile () {
                this.$refs.fileInput.click()
            },
            onFilePicked (event) {
                const files = event.target.files
                let filename = files[0].name
                if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]        

            }
        }
    }
</script>
