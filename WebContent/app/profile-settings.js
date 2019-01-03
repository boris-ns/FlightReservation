Vue.component('profile-settings', {
    data: function() {
        return {
            userInfo: {
                username: null,
                password: null,
                name: null,
                surname: null,
                phoneNumber: null,
                email: null
            },
            oldPassword: null,
            newPassword: null,
            passwordAgain: null,
            selectedImage: null,
        }
    },

    template:
    `
    <div>
        <h3>Podešavanja profila</h3>
        Korisničko ime
        <input type="text" v-model="userInfo.username" /><br />
        
        Stara lozinka
        <input type="password" v-model="oldPassword" /><br />

        Nova lozinka (ostaviti prazno ako ne menjate lozinku)
        <input type="password" v-model="newPassword" /><br />
        
        Ponovite novu lozinku (ostaviti prazno ako ne menjate lozinku)
        <input type="password" v-model="passwordAgain" /><br />
        
        Ime
        <input type="text" v-model="userInfo.name" /><br />
        
        Prezime
        <input type="text" v-model="userInfo.surname" /><br />
        
        Broj telefona
        <input type="text" v-model="userInfo.phoneNumber" /><br />
        
        E-Mail
        <input type="text" v-model="userInfo.email" /><br />
        
        Profilna slika:
        <input type="file" accept="image/*" v-on:change="onFileChanged" /><br />
        
        <input type="button" value="Izmeni" v-on:click="editProfile()" /><br />
    </div>
    `,

    methods: {
        onFileChanged : function(event) {
            this.selectedImage = event.target.files[0];
        },

        editProfile : function() {
            if (this.oldPassword !== this.userInfo.password) {
                toast('Stara lozinka koju ste uneli nije ispravna!');
                return;
            }

            if (this.passwordAgain !== this.newPassword) {
                toast('Lozinke koje ste uneli se ne poklapaju. Pokuštajte ponovo.');
                return;
            }

            if (this.newPassword !== null) {
                this.userInfo.password = this.newPassword;
            }

            axios.post('rest/data/editUser', this.userInfo)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toast('Greška prilikom izmene podataka. Pokušajte kasnije.');
                } else {
                    toast('Vaš profil je uspešno izmenjen')
                    if (this.selectedImage != null) {
                        const formData = new FormData();
                        formData.append('username', this.userInfo.username);
                        formData.append('file', this.selectedImage, this.selectedImage.name);
                        
                        axios.post('rest/data/register-image/', formData)
                        .then(response => { this.selectedImage = null; });
                    }
                }
            });
        },
    },

    mounted() {
        axios.get('rest/data/getUserInfo').then(response => this.userInfo = response.data);
    }
});