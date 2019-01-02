Vue.component('profile-settings', {
    data: function() {
        return {
            // backup: {
            //     username: null,
            //     password: null,
            //     name: null,
            //     surname: null,
            //     phoneNumber: null,
            //     email: null,
            // },
            oldPassword: null,
            newPassword: null,
            passwordAgain: null,
            selectedImage: null,
        }
    },

    props: [
        'user',
    ],

    template:
    `
    <div>
        <h3>Podešavanja profila</h3>
        Korisničko ime
        <input type="text" v-model="user.username" /><br />
        
        Stara lozinka
        <input type="password" v-model="oldPassword" /><br />

        Nova lozinka (ostaviti prazno ako ne menjate lozinku)
        <input type="password" v-model="newPassword" /><br />
        
        Ponovite novu lozinku (ostaviti prazno ako ne menjate lozinku)
        <input type="password" v-model="passwordAgain" /><br />
        
        Ime
        <input type="text" v-model="user.name" /><br />
        
        Prezime
        <input type="text" v-model="user.surname" /><br />
        
        Broj telefona
        <input type="text" v-model="user.phoneNumber" /><br />
        
        E-Mail
        <input type="text" v-model="user.email" /><br />
        
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
            if (this.oldPassword !== this.user.password) {
                toast('Stara lozinka koju ste uneli nije ispravna!');
                return;
            }

            if (this.passwordAgain !== this.newPassword) {
                toast('Lozinke koje ste uneli se ne poklapaju. Pokuštajte ponovo.');
                return;
            }

            if (this.newPassword !== null) {
                this.user.password = this.newPassword;
            }

            axios.post('rest/data/editUser', this.user)
            .then(response => {
                if (response.data === '') { // user doesn't exists
                    toast('Greška prilikom izmene podataka. Pokušajte kasnije.');
                } else {
                    if (this.selectedImage != null) {
                        const formData = new FormData();
                        formData.append('username', this.user.username);
                        formData.append('file', this.selectedImage, this.selectedImage.name);
                        
                        // @TODO change this path, also create ednpoint in service for changing this image
                        axios.post('rest/auth/register-image/', formData)
                        .then(response => { this.selectedImage = null; });
                    }
                }
            });
        },
    },

    mounted() {
        // this.backup = Object.assign({}, this.user);
    }
});