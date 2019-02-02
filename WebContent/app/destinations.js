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
            backupDest: {
                name: null,
                country: null,
                airportName: null,
                airportCode: null,
                location: null,
            },
            editingEnabled: false,
        }
    },

    template:
    `
    <div>
    	<p>
    		Dodavanje nove destinacije:
	    	<input type="button" value="Dodaj" v-on:click="showAddDestComponent()" />
    	</p>
    	
        <div id="addDestination" class="modal">
        	<div class="modal-content">
        		<span class="close">&times;</span>
	            
	            <p>Popunite sledeća polja za unos destinacije</p>
	            
	            <table>
	                <tr>
	                	<td>Naziv</td>
	                	<td><input type="text" v-model="destToAdd.name" /></td>
	                </tr>
	                <tr>
	                	<td>Država</td>
	                	<td><input type="text" v-model="destToAdd.country" /></td>
	                </tr>
	                <tr>
	                	<td>Naziv aerodroma</td>
	                	<td><input type="text" v-model="destToAdd.airportName" /></td>
	                </tr>
	                <tr>
	                	<td>Kod aerodroma</td>
	                	<td><input type="text" v-model="destToAdd.airportCode" /></td>
	                </tr>
	                <tr>
	                	<td>Lokacija</td>
	                	<td><input type="text" v-model="destToAdd.location" /></td>
	                </tr>
	                <tr>
	                	<td>Slika</td>
	                	<td><input type="file" accept="image/*" v-on:change="onFileChanged" /></td>
	                </tr>
	                <tr>
	                	<th colspan="2"><input type="button" value="Dodaj" v-on:click="addDestination()" /></th>
	                </tr>
	            </table>
	    	</div>
        </div>

        <div id="editDestinationForm" class="modal">
        	<div class="modal-content">
	            <table>
	                <tr>
	                	<td>Naziv</td>
	                	<td><input type="text" v-model="backupDest.name" /></td>
	                </tr>
	                <tr>
	                	<td>Država</td>
	                	<td><input type="text" v-model="backupDest.country" /></td>
	                </tr>
	                <tr>
	                	<td>Naziv aerodroma</td>
	                	<td><input type="text" v-model="backupDest.airportName" /></td>
	                </tr>
	                <tr>
	                	<td>Kod aerodroma</td>
	                	<td><input type="text" v-model="backupDest.airportCode" /></td>
	                </tr>
	                <tr>
	                	<td>Lokacija</td>
	                	<td><input type="text" v-model="backupDest.location" /></td>
	                </tr>
	                <tr>
	                	<td>Slika</td>
	                	<td><input type="file" accept="image/*" v-on:change="onFileChanged" /></td>
	                </tr>
	                <tr>
	    				<th><input type="button"  value="Izmeni"  v-on:click="editDestination()" /></th>
				    	<th><input type="button"  value="Poništi" v-on:click="cancelEdit()" /></th>
	    			</tr>
	            </table>
    		</div>
        </div>

    	<h3>Spisak svih destinacija</h3>

        <table class="table-data">
            <tr>
                <th>Slika</th>
                <th>Naziv</th>
                <th>Država</th>
                <th>Naziv aerodroma</th>
                <th>Kod aerodroma</th>
                <th>Stanje</th>
                <th>Promeni stanje</th>
                <th>Izmena</th>
            </tr>

            <tr v-for="dest in destinations">
                <td><img class="destination-image" :src="dest.imagePath" alt="Slika ne postoji" onclick="window.open(this.src)" /></td>
                <td>{{dest.name}}</td>
                <td>{{dest.country}}</td>
                <td>{{dest.airportName}}</td>
                <td>{{dest.airportCode}}</td>
                <td>{{dest.state}}</td>

                <td>
                    <input type="button" value="Promeni" v-on:click="changeDestinationState(dest)" />
                </td>
                <td>
                    <input type="button" value="Izmeni" v-on:click="onClickEdit(dest)" />
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
        	$('#addDestination').css("display", "block");
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
                        $('#addDestination').css("display", "none");
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

        onClickEdit : function(destToEdit) {
            if (this.editingEnabled) {
                toast('Ne možete menjati informicije o 2 destinacije istovremeno.');
                return;
            }

            this.editingEnabled = true;
            this.backupDest = Object.assign({}, destToEdit);
            this.backupDest.oldName = this.backupDest.name;

            $('#editDestinationForm').css("display", "block");
        },

        editDestination : function() {
            axios.post('rest/data/editDestination', this.backupDest, "NEKOIME")
            .then(response => {
                if (response.data === '') {
                    toast('Došlo je do greške prilikom izmene destinacije.');
                    return;
                }
                
                let destToEdit = this.destinations.find(obj => obj.name === this.backupDest.oldName);
                this.copyDataIntoObject(destToEdit, response.data);

                if (this.selectedImage != null) {
                    const formData = new FormData();
                    formData.append('name', this.backupDest.name);
                    formData.append('file', this.selectedImage, this.selectedImage.name);
                    
                    axios.post('rest/data/addImageForDestination', formData)
                    .then(response => { 
                        this.selectedImage = null;
                        destToEdit.imagePath = response.data.imagePath;
                    });
                }
            });

            this.cancelEdit();
        },

        cancelEdit : function() {
            $('#editDestinationForm').css('display', 'none');
            this.editingEnabled = false;
        },

        copyDataIntoObject : function(toObj, fromObj) {
            toObj.name = fromObj.name;
            toObj.country = fromObj.country;
            toObj.airportCode = fromObj.airportCode;
            toObj.airportName = fromObj.airportName;
            toObj.location = fromObj.location;
        }
    },

    mounted() {
        this.getAllDestinations();
        
        $('.modal').css('display', 'none');

        $('.close').on('click', function() {
        	$('.modal').css('display', 'none');
        });
    }
});