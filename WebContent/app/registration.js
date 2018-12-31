Vue.component('registration', {

    data: function() {
        return {
            user: {
                username: null,
                password: null,
                name: null,
                surname: null,
                phoneNumber: null,
                email: null,
            },
            selectedImage: null,
            loggedUser: null,
            userLoggedIn: false,
        }
    },

    template: 
    `
    <div v-if="!userLoggedIn">
        <table>
            <h3>Popunite sledeća polja da bi ste se registrovali</h3>
            <tr><input type="text"     placeholder="Korisničko ime" v-model="user.username" /></tr>
            <tr><input type="password" placeholder="Lozinka"        v-model="user.password" /></tr>
            <tr><input type="text"     placeholder="Ime"            v-model="user.name" /></tr>
            <tr><input type="text"     placeholder="Prezime"        v-model="user.surname" /></tr>
            <tr><input type="text"     placeholder="Broj telefona"  v-model="user.phoneNumber" /></tr>
            <tr><input type="text"     placeholder="E-Mail"         v-model="user.email" /></tr>
            <tr><input type="file"     accept="image/*"             v-on:change="onFileChanged" /></tr>
            <tr><input type="button"   value="Registruj se"         v-on:click="register()" /></tr>
        </table>
    </div>

    <div v-else-if="userLoggedIn">
        <home-page :user="loggedUser"></home-page>
    </div>
    `,

    methods: {
        onFileChanged : function(event) {
            this.selectedImage = event.target.files[0];
        },

        register : function() {
            const formData = new FormData();
            formData.append('user', this.user);

            axios.post('rest/auth/register', this.user)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toast('Greška prilikom registrovanja naloga');
                } else {
                    this.loggedUser = response.data;

                    const formData = new FormData();
                    formData.append('username', this.user.username);
                    formData.append('file', this.selectedImage, this.selectedImage.name);
                    
                    axios.post('rest/auth/register-image/', formData)
                    .then(response => { });

                    this.userLoggedIn = true;
                }
            });
        }
    },

    mounted() {
    },
});