<template>
    <div id="login">
        <transition nama="fade">
            <div v-if="performingRequest" class="loading">
                <p>Loading...</p>
            </div>
        </transition>
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
                    <button @click="login" class="button">Log In</button>
                    <div class="extras">
                        <a @click="togglePasswordReset">Lupa Password</a>
                        <a @click="toggleForm">Daftar untuk berlangganan</a>
                    </div>
                </v-form>

                <!-- form daftar -->
                <v-form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
                    <h1>Mulai Berlangganan</h1>
                    <v-text-field label="Nama" v-model.trim="signupForm.nama" id="nama" prepend-icon="mdi-account" :rules="inputRules" ></v-text-field>
                    <v-text-field label="Email" v-model.trim="signupForm.email" id="email2" prepend-icon="mdi-email" :rules="emailRules"></v-text-field>
                    <v-text-field label="Password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    v-model.trim="signupForm.password" id="password2" prepend-icon="mdi-textbox-password" :rules="inputRules"></v-text-field>
                    <button @click="signup" class="button">Daftar</button>
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
                        <button @click="resetPassword" class="button">Submit</button>
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
                <transition nama="fade">
                    <div v-if="errorMsg !== ''" class="error-msg">
                        <p>{{ errorMsg }}</p>
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
                loginForm: {
                    email: '',
                    password: ''
                },
                signupForm: {
                    nama: '',
                    email: '',
                    password: ''
                },
                passwordForm: {
                    email: ''
                },
                show: false,
                showLoginForm: true,
                showForgotPassword: false,
                passwordResetSuccess: false,
                performingRequest: false,
                errorMsg: '',
                loading: false,
                // Rules input + rules date
                inputRules:[
                        v => !!v || 'Input is required',
                        v => (v && v.length >= 3) || 'Input must be more than 3 characters',
                        ],
                // email rules menggunakan regex ( regular expresion)
                emailRules:[
                v => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(v) || 'Invalid e-mail.'}
                ],
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

            },
            signUp(){

            },
            resetPassword(){

            }
        }
    }
</script>
