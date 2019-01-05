Vue.component('admin-destinations', {
    data: function() {
        return {
            destinations: [],
            destToAdd: {
                name: null,
                country: null,
                airportName: null,
                airportCode: null,
                location: null,
            },
            selectedImage: null,
        }
    },

    template:
    `
    <div>
        <input type="button" value="Dodavanje destinacije" v-on:click="showAddDestComponent()" />
        <div id="addDestination">
            <p>Popunite sledeća polja za unos destinacije</p>
            
            <table>
                <tr><input type="text"    placeholder="Naziv"            v-model="destToAdd.name"        /></tr>
                <tr><input type="text"    placeholder="Država"           v-model="destToAdd.country"     /></tr>
                <tr><input type="text"    placeholder="Naziv aerodroma"  v-model="destToAdd.airportName" /></tr>
                <tr><input type="text"    placeholder="Kod aerodroma"    v-model="destToAdd.airportCode" /></tr>
                <tr><input type="text"    placeholder="Lokacija"         v-model="destToAdd.location"    /></tr>
                <tr><input type="file"    accept="image/*"               v-on:change="onFileChanged"     /></tr>
                <tr><input type="button"  value="Dodaj"      v-on:click="addDestination()"   /></tr>
            </table>
        </div>

        <table>
            <tr>
                <th>Slika</th>
                <th>Naziv</th>
                <th>Država</th>
                <th>Naziv aerodroma</th>
                <th>Kod aerodroma</th>
                <th>Stanje</th>
                <th>Promeni stanje</th>
            </tr>

            <tr v-for="dest in destinations">
                <td><img :src="dest.pathToImage" alt="Slika ne postoji" /></td>
                <td>{{dest.name}}</td>
                <td>{{dest.country}}</td>
                <td>{{dest.airportName}}</td>
                <td>{{dest.airportCode}}</td>
                <td>{{dest.state}}</td>

                <td>
                    <input type="button" value="Promeni" v-on:click="changeDestinationState(dest)" />
                </td>
            </tr>
        </table>
    
    </div>
    `,

    methods: {
        getAllDestinations : function() {
            axios.get('rest/data/getAllDestinations').then(response => this.destinations = response.data);
        },

        changeDestinationState : function(destination) {
            axios.post('rest/data/changeDestinationState', destination)
            .then(response => { 
                if (response.data) {
                    destination.state = response.data.state;
                }
            });
        },

        showAddDestComponent : function() {
            $('#addDestination').toggle();
        },

        onFileChanged : function(event) {
            this.selectedImage = event.target.files[0];
        },

        addDestination : function() {
            if (!this.checkInputFields()) {
                return;
            }

            axios.post('rest/data/addDestination', this.destToAdd)
            .then(response => {
                if (response.data == '') {
                    toast('Destinacija već postoji u sistemu.');
                    return;
                }

                if (this.selectedImage != null) {
                    const formData = new FormData();
                    formData.append('name', this.destToAdd.name);
                    formData.append('file', this.selectedImage, this.selectedImage.name);
                    
                    axios.post('rest/data/addImageForDestination', formData)
                    .then(response => { 
                        this.selectedImage = null;
                        this.destinations.push(response.data);
                    });
                }
            });
        },

        checkInputFields : function() {
            if (this.destToAdd.name == null || this.destToAdd.name.trim() === '') {
                toast('Morate uneti naziv destinacije.');
                return false;
            } else if (this.destToAdd.country == null || this.destToAdd.country.trim() === '') {
                toast('Morate uneti državu.');
                return false;
            } else if (this.destToAdd.airportName == null || this.destToAdd.airportName.trim() === '') {
                toast('Morate uneti naziv aerodroma.');
                return false;
            } else if (this.destToAdd.airportCode == null || this.destToAdd.airportCode.trim() === '') {
                toast('Morate uneti kod aerodroma.');
                return false;
            } else if (this.destToAdd.location == null || this.destToAdd.location.trim() === '') {
                toast('Morate uneti koordinate destinacije.');
                return false;
            } else if (this.selectedImage == null) {
                toast('Morate odabrati sliku destinacije.');
                return false;
            }

            return true;
        },

    },

    mounted() {
        this.getAllDestinations();
        $('#addDestination').hide();
    }
});