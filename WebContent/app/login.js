Vue.component('login', {

    data: function() {
        return {
            user: {
                username: null,
                password: null
            },
            userLoggedIn: false,
            loggedUser: null
        }
    },

    template:
    `
    <div class="login-form" v-if="!userLoggedIn">
        <table>
        	<tr><td colspan="2"><img src="res/images/logo.png" /></td></tr>
            <tr><td><input type="text"     placeholder="Korisničko ime" v-model="user.username" /></td></tr>
            <tr><td><input type="password" placeholder="Lozinka"        v-model="user.password" /></td></tr>
            <tr><td><input type="button"   value="Prijavi se"           v-on:click="login()"    /></td></tr>
            <tr><td colspan="2"><a href="#/registration">Nemaš nalog? Registruj se</a></td></tr>
        </table>
    </div>
    <div v-else-if="userLoggedIn">
        <home-page  v-if="loggedUser.type === 'REGULAR'"    :user="loggedUser"></home-page>
        <admin-page v-else-if="loggedUser.type === 'ADMIN'" :user="loggedUser"></admin-page>
    </div>
    `,

    methods: {
        login : function() {
            if (!this.checkIfInputsAreFilled()) {
                return;
            }

            axios.post('rest/auth/login', this.user)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toast('Nalog sa unetom kombinacijom korisničkog imena i lozinke ne postoji.');
                } else {
                    this.loggedUser = response.data;
                    
                    if (this.loggedUser.state === "BLOCKED") {
                        toast('Vaš nalog je blokiran. Ne možete se prijaviti na aplikaciju.'); 
                    } else {
                        this.userLoggedIn = true;
                    }
                }
            });
        },

        checkIfInputsAreFilled : function() {
            if (this.user.username == null || this.user.username.trim() === '') {
                toast('Niste uneli korisničko ime.');
                return false;
            } else if (this.user.password == null || this.user.username.trim() === '') {
                toast('Niste uneli lozinku.');
                return false;
            }

            return true;
        }
    },

    mounted() {
        axios.get('rest/data/getUserInfo')
        .then(response => {
            this.loggedUser = response.data;
            this.userLoggedIn = (response.data === '') ? false : true; 
        });
    }

});