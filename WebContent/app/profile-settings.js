Vue.component('profile-settings', {
    data: function() {
        return {
            userInfo: {
                username: null,
                password: null,
                name: null,
                surname: null,
                phoneNumber: null,
                email: null,
                imagePath: null
            },
            oldPassword: null,
            newPassword: null,
            passwordAgain: null,
            selectedImage: null,
            userImage: null,
        }
    },

    template:
    `
    <div>
        <h3>Podešavanja profila</h3>
        
        <table align="center" class="table-form">
    		<tr>
    			<th colspan="2"><img class="profile-image" :src="userInfo.imagePath" alt="Profilna slika" /></th>
    		</tr>
        	<tr>
        		<td>Korisničko ime</td>
        		<td><input type="text" v-model="userInfo.username" /></td>
        	</tr>
        	<tr>
        		<td>Stara lozinka</td>
        		<td><input type="password" v-model="oldPassword" /></td>
        	</tr>
        	<tr>
        		<td>Nova lozinka</td>
        		<td>
        			<input type="password" v-model="newPassword" /><br />
        			(ostaviti prazno ako ne menjate loznku)
        		</td>
        	</tr>
        	<tr>
        		<td>Ponovite novu lozinku</td>
        		<td>
        			<input type="password" v-model="passwordAgain" /><br />
        			(ostaviti prazno ako ne menjate loznku)
        		</td>
        	</tr>
        	<tr>
        		<td>Ime</td>
        		<td><input type="text" v-model="userInfo.name" /></td>
        	</tr>
        	<tr>
        		<td>Prezime</td>
    			<td><input type="text" v-model="userInfo.surname" /></td>
        	</tr>
        	<tr>
        		<td>Broj telefona</td>
        		<td><input type="text" v-model="userInfo.phoneNumber" /></td>
        	</tr>
        	<tr>
        		<td>E-Mail</td>
        		<td><input type="text" v-model="userInfo.email" /></td>
        	</tr>
        	<tr>
        		<td>Profilna slika</td>
        		<td><input type="file" accept="image/*" v-on:change="onFileChanged" /></td>
        	</tr>
        	<tr>
        		<th colspan="2"><input type="button" value="Izmeni" v-on:click="editProfile()" /></th>
        	</tr>
        </table>
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
                    if (this.selectedImage != null) {
                        const formData = new FormData();
                        formData.append('username', this.userInfo.username);
                        formData.append('file', this.selectedImage, this.selectedImage.name);
                        
                        axios.post('rest/data/editUserImage/', formData)
                        .then(response => { this.selectedImage = null; });
                    }

                    toast('Vaš profil je uspešno izmenjen');
                }
            });
        },
        
        getUserImage : function() {
        	axios.get('rest/files/getUserImage').then(response => {
        		let b64Response = btoa(unescape(encodeURIComponent(response.data)));
        		$("#profile-image").attr("src", "data:image/png;base64," + b64Response);
        	});
        },
    },

    mounted() {
        axios.get('rest/data/getUserInfo').then(response => this.userInfo = response.data);
        //this.getUserImage();
    }
});