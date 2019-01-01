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
            passwordAgain: null,
            selectedImage: null,
        }
    },

    template: 
    `
    <div>
        <table>
            <h3>Popunite sledeća polja da bi ste se registrovali</h3>
            <tr><input type="text"     placeholder="Korisničko ime"   v-model="user.username"     /></tr>
            <tr><input type="password" placeholder="Lozinka"          v-model="user.password"     /></tr>
            <tr><input type="password" placeholder="Ponovite lozinku" v-model="passwordAgain"     /></tr>
            <tr><input type="text"     placeholder="Ime"              v-model="user.name"         /></tr>
            <tr><input type="text"     placeholder="Prezime"          v-model="user.surname"      /></tr>
            <tr><input type="text"     placeholder="Broj telefona"    v-model="user.phoneNumber"  /></tr>
            <tr><input type="text"     placeholder="E-Mail"           v-model="user.email"        /></tr>
            <tr><input type="file"     accept="image/*"               v-on:change="onFileChanged" /></tr>
            <tr><input type="button"   value="Registruj se"           v-on:click="register()"     /></tr>
        </table>
    </div>
    `,

    methods: {
        onFileChanged : function(event) {
            this.selectedImage = event.target.files[0];
        },

        register : function() {
            if (!this.checkIfInputsAreFilled()) {
                return;
            }

            if (this.passwordAgain !== this.user.password) {
                toast('Lozinke koje ste uneli se ne poklapaju. Pokuštajte ponovo.');
                return;
            }

            const formData = new FormData();
            formData.append('user', this.user);

            axios.post('rest/auth/register', this.user)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toast('Greška prilikom registrovanja naloga. Korisničko ime je zauzeto.');
                } else {
                    if (this.selectedImage != null) {
                        const formData = new FormData();
                        formData.append('username', this.user.username);
                        formData.append('file', this.selectedImage, this.selectedImage.name);
                        
                        axios.post('rest/auth/register-image/', formData)
                        .then(response => { this.selectedImage = null; });
                    }

                    router.push('/');
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
            } else if (this.passwordAgain == null || this.passwordAgain.trim() === '') {
                toast('Niste uneli lozinku.');
                return false;
            } else if (this.user.name == null || this.user.name.trim() === '') {
                toast('Niste uneli ime.');
                return false;
            } else if (this.user.surname == null || this.user.surname.trim() === '') {
                toast('Niste uneli prezime.');
                return false;
            } else if (this.user.phoneNumber == null || this.user.phoneNumber.trim() === '') {
                toast('Niste uneli broj telefona.');
                return false;
            } else if (this.user.email == null || this.user.email.trim() === '') {
                toast('Niste uneli e-mail adresu.');
                return false;
            } 

            return true;
        }
    },

    mounted() {
    },
});