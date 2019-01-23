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
        <table align="center" class="table-form">
            <tr>
            	<th colspan="2">Popunite sledeća polja da bi ste se registrovali</th></tr>
            <tr>
            	<td>Korisničko ime</td>
            	<td><input type="text" v-model="user.username" /></td>
            </tr>
            <tr>
            	<td>Lozinka</td>
            	<td><input type="password" v-model="user.password" /></td>
            </tr>
            <tr>
            	<td>Ponovite lozinku</td>
            	<td><input type="password" v-model="passwordAgain" /></td>
            </tr>
            <tr>
            	<td>Ime</td>
            	<td><input type="text" v-model="user.name" /></td>
            </tr>
            <tr>
            	<td>Prezime</td>
            	<td><input type="text" v-model="user.surname" /></td>
            </tr>
            <tr>
            	<td>Broj telefona</td>
            	<td><input type="text" v-model="user.phoneNumber" /></td>
            </tr>
            <tr>
            	<td>E-Mail</td>
            	<td><input type="text" v-model="user.email" /></td>
            </tr>
            <tr>
            	<td>Profilna slika</td>
            	<td><input type="file" v-on:change="onFileChanged" /></td>
            </tr>
            <tr>
            	<th colspan="2"><input type="button" value="Registruj se" v-on:click="register()" /></th>
            </tr>
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