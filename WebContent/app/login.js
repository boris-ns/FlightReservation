Vue.component('login', {

    data: function() {
        return {
            user: {
                username: null,
                password: null
            },
            userLoggedIn: false
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
        <home-page></home-page>
    </div>
    `,

    methods: {
        login : function() {
            axios.post('rest/auth/login', this.user)
            .then(response => {
                this.userLoggedIn = response.data
                
                if (!this.userLoggedIn) {
                    toast('Nalog sa unetom kombinacijom korisničkog imena i lozinke ne postoji.');
                }
            });
        }
    },

    mounted() {

    }

});