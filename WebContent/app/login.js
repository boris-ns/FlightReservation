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
    <div v-if="!userLoggedIn">
        <table>
            <tr><input type="text"     placeholder="Korisničko ime" v-model="user.username" required /></tr>
            <tr><input type="password" placeholder="Lozinka"        v-model="user.password" required /></tr>
            <tr><input type="button"   value="Prijavi se"           v-on:click="login()" /></tr>
            <tr><a href="#/registration">Nemaš nalog? Registruj se</a></tr>
        </table>
    </div>
    <div v-else-if="userLoggedIn">
        <home-page  v-if="loggedUser.type === 'REGULAR'"    :user="loggedUser"></home-page>
        <admin-page v-else-if="loggedUser.type === 'ADMIN'" :user="loggedUser"></admin-page>
    </div>
    `,

    methods: {
        login : function() {
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
        }
    },

    mounted() {

    }

});