Vue.component('admin-flights', {
    data: function() {
        return {
            flights: [],
            backupFlights: [],
            flightToAdd: {
                flightId: null,
                startDest: null,
                endDest: null,
                reservations: [],
                ticketPrice: null,
                airplaneModel: null,
                numFirstClassSeats: null,
                numBussinessClassSeats: null,
                numEconomyClassSeats: null,
                flightDate: null,
                flightClass: null,
            },
            backupFlight: {
                oldFlightId: null,
                flightId: null,
                startDest: null,
                endDest: null,
                reservations: [],
                ticketPrice: null,
                airplaneModel: null,
                numFirstClassSeats: null,
                numBussinessClassSeats: null,
                numEconomyClassSeats: null,
                flightDate: null,
                flightClass: null,
            },
            destinations: [],
            editingEnabled: false,
            searchTerm: null,
            searchTermDate: null,
            searchCriteria: null,
            filterCriteria: null,
        }
    },

    template:
    `
    <div>
    	<p>
    		Dodavanje novog leta:
	    	<input type="button" value="Dodaj" v-on:click="toggleFlightComponent()" />
    	</p>
    	
        <div id="addFlight" class="modal">
        	<div class="modal-content">
        		<span class="close">&times;</span>
        		
	            <p>Popunite sledeća polja za unos leta</p>
	            
	            <table>
	                <tr>
	                	<td>Broj leta (ID)</td>
	    				<td><input type="text" v-model="flightToAdd.flightId" /></td>
	                </tr>
	                <tr>
	                    <td>Početna destinacija</td>
	                    <td>
	                    	<select v-model="flightToAdd.startDest">
	                    		<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
	                    	</select>
	                    </td>
	                </tr>
	                <tr>
	    				<td>Krajnja destinacija</td>
	                    <td>
	                    	<select v-model="flightToAdd.endDest">
	                    		<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
	                    	</select>
	                    </td>
	                </tr>
	                <tr>
	                	<td>Cena karte</td>
	                	<td><input type="number" v-model="flightToAdd.ticketPrice" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Model aviona</td>
	                	<td><input type="text" v-model="flightToAdd.airplaneModel" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u prvoj klasi</td>
	                	<td><input type="number" v-model="flightToAdd.numFirstClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u biznis klasi</td>
	                	<td><input type="number" v-model="flightToAdd.numBussinessClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u ekonomskoj klasi</td>
	                	<td><input type="number" v-model="flightToAdd.numEconomyClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Datum leta</td>
	                	<td><input type="date" v-model="flightToAdd.flightDate" class="date-input" /></td>
	                </tr>
	                <tr>
	                    <td>Klasa leta</td>
	                    <td>
	                    	<select v-model="flightToAdd.flightClass">
	                        	<option value="CHARTER">Čarter</option>
	                        	<option value="REGIONAL">Regionalni</option>
	                        	<option value="OVERSEAS">Prekookeanski</option>
	                    	</select>
	                    </td>
	                </tr>
	                <tr>
	                	<th colspan="2"><input type="button" value="Dodaj" v-on:click="addFlight()" /></th>
	                </tr>
	            </table>
    		</div>
        </div>

        <div id="editFlightForm" class="modal">
        	<div class="modal-content">
	            <table>
	                <tr>
	                	<td>Broj leta (ID)</td>
	                	<td><input type="text" v-model="backupFlight.flightId" /></td>
	                </tr>
	                <tr>
	                    <td>Početna destinacija</td>
	                    <td>
	                    	<select v-model="backupFlight.startDest">
	                        	<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
	    					</select>
	    				</td>
	                </tr>
	                <tr>
	                    <td>Krajnja destinacija</td>
	                    <td>
	                    	<select v-model="backupFlight.endDest">
	                        	<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
	                    	</select>
	                    </td>
	                </tr>
	                <tr>
	                	<td>Cena karte</td>
	                	<td><input type="number" v-model="backupFlight.ticketPrice" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Model aviona</td>
	                	<td><input type="text" v-model="backupFlight.airplaneModel" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u prvoj klasi</td>
	                	<td><input type="number" v-model="backupFlight.numFirstClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u biznis klasi</td>
	                	<td><input type="number" v-model="backupFlight.numBussinessClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Broj mesta u ekonomskoj klasi</td>
	                	<td><input type="number" v-model="backupFlight.numEconomyClassSeats" min="0" /></td>
	                </tr>
	                <tr>
	                	<td>Datum leta</td>
	                	<td><input type="date" v-model="backupFlight.flightDate" class="date-input" /></td>
	                </tr>
	                <tr>
	                    <td>Klasa leta</td>
	                    <td>
		                    <select v-model="backupFlight.flightClass">
		                        <option value="CHARTER">Čarter</option>
		                        <option value="REGIONAL">Regionalni</option>
		                        <option value="OVERSEAS">Prekookeanski</option>
		                    </select>
		                </td>
	                </tr>
	                <tr>
	                	<th><input type="button" value="Izmeni"  v-on:click="editFlight()" /></th>
				    	<th><input type="button" value="Poništi" v-on:click="onCancelEdit()" /></th>
	                </tr>
	            </table> 
    		</div>
        </div>

        <h3>Spisak letova</h3>

    	<table>
    		<tr>
    			<td>Filtriranje po</td>
    			<td>
    				<select v-model="filterCriteria">
    					<option value="0" selected>--odaberite--</option>
    					<option value="1">datumu (najnovije)</option>
    					<option value="2">klasi leta</option>
    					<option value="3">broju leta</option>
    				</select>
    			</td>
    		</tr>
    		<tr>
    			<td>Pretraga po</td>
    			<td>
    				<select v-model="searchCriteria" v-on:change="selectCriteriaChange()">
    					<option value="0" selected>--odaberite--</option>
    					<option value="1">početnoj destinaciji</option>
    					<option value="2">krajnjoj destinaciji</option>
    					<option value="3">državi početne destinacije</option>
    					<option value="4">državi krajnje destinacije</option>
    					<option value="5">datumu leta</option>
    				</select>
    			</td>
		    	<td>
		    		<input type="text" id="input-field-search" v-model="searchTerm" />
    				<input type="date" id="input-date-search" v-model="searchTermDate" />
    			</td>
    		</tr>
    		<tr>
    			<th colspan = 3>
    				<input type="button" value="Pretraži" v-on:click="filterSearch()" />
    			</th>
    		</tr>
    	</table>

        <table class="table-data">
            <tr>
                <th>ID</th>
                <th>Početna destinacija</th>
                <th>Početni aerodrom</th>
                <th>Kod početnog aerodroma</th>
                <th>Krajnja destinacija</th>
                <th>Krajnji aerodrom</th>
                <th>Kod krajnjeg aerodroma</th>
                <th>Broj rezervacija</th>
                <th>Cena karte</th>
                <th>Model aviona</th>
                <th>Broj sedišta u prvoj klasi</th>
                <th>Broj sedišta u biznis klasi</th>
                <th>Broj sedišta u ekonomskoj klasi</th>
                <th>Datum leta</th>
                <th>Klasa leta</th>
                <th>Brisanje</th>
                <th>Izmena</th>
            </tr>

            <tr v-for="f in flights">
                <td>{{f.flightId}}</td>
                <td>{{f.startDest.name}}</td>
                <td>{{f.startDest.airportName}}</td>
                <td>{{f.startDest.airportCode}}</td>
                <td>{{f.endDest.name}}</td>
                <td>{{f.endDest.airportName}}</td>
                <td>{{f.endDest.airportCode}}</td>
                <td>{{f.reservations.length}}</td>
                <td>{{f.ticketPrice}}</td>
                <td>{{f.airplaneModel}}</td>
                <td>{{f.numFirstClassSeats}}</td>
                <td>{{f.numBussinessClassSeats}}</td>
                <td>{{f.numEconomyClassSeats}}</td>
                <td>{{convertDate(f.flightDate)}}</td>
                <td>{{f.flightClass}}</td>
                <td>
                    <input type="button" value="Obriši" v-on:click="removeFlight(f)" />
                </td>
                <td>
                    <input type="button" value="Izmeni" v-on:click="onClickEdit(f)" />
                </td>
            </tr>
        </table>
    </div>
    `,

    methods: {
        getAllFlights : function() {
            axios.get('rest/data/getAllFlights').then(response => this.flights = response.data);
        },

        convertDate : function(milliseconds) {
            let date = new Date(milliseconds);
            return date.toDateString();
        },

        toggleFlightComponent : function() {
            $('#addFlight').css('display', 'block');
        },

        addFlight : function() {
            if (!this.checkAllInputFields()) {
                return;
            }

            axios.post('rest/data/addFlight', this.flightToAdd)
            .then(response => {
                if (response.data === '') {
                    toast('Greška prilikom dodavanja leta');
                    return;
                }

                this.flights.push(this.flightToAdd);
                this.toggleFlightComponent();
            });

        },

        getAllDestinations : function() {
            axios.get('rest/data/getAllDestinations').then(response => this.destinations = response.data);
        },

        removeFlight : function(flight) {
            if (flight.reservations.length !== 0) {
                toast('Ne možete obrisati let jer postoje rezervacije za njega.');
                return;
            }

            axios.post('rest/data/removeFlight', flight)
            .then(response => {
                if (response.data === '') {
                    toast('Greška prilikom brisanja leta.');
                    return;
                }

                const indexOfFlight = this.flights.findIndex(obj => obj.flightId === flight.flightId);
                this.flights.splice(indexOfFlight, 1);
            });
        },

        onClickEdit : function(flightToEdit) {
            if (this.editingEnabled) {
                toast('Ne možete menjati informicije o 2 leta istovremeno.');
                return;
            }

            this.editingEnabled = true;
            this.backupFlight = Object.assign({}, flightToEdit);
            this.backupFlight.oldFlightId = this.backupFlight.flightId;

            $('#editFlightForm').css('display', 'block');
        },

        onCancelEdit : function() {
        	$('#editFlightForm').css('display', 'none');
            this.editingEnabled = false;
        },

        editFlight : function() {
            axios.post('rest/data/editFlight', this.backupFlight)
            .then(response => {
                if (response.data === '') {
                    toast('Greška tokom izmene podataka o letu.');
                    return;
                }

                let flightToEdit = this.flights.find(obj => obj.flightId === this.backupFlight.oldFlightId);
                this.copyDataIntoObject(flightToEdit, response.data);
                $('#editFlightForm').css('display', 'none');
                this.editingEnabled = false;
            });
        },
        
        filterSearch : function() {
        	// Only first time make backup list
        	if (this.backupFlights.length == 0) {
        		this.backupFlights = this.flights; // save the reference to the original list of flights
        	} else { // Restore backup
        		this.flights = this.backupFlights;
        	}
        	
        	switch (Number.parseInt(this.searchCriteria)) {
        	case 0: this.flights = this.backupFlights;              break;
        	case 1: this.flights = this.getFlightsByStartDest();    break;
        	case 2: this.flights = this.getFlightsByEndDest();      break;
        	case 3: this.flights = this.getFlightsByStartCountry(); break;
        	case 4: this.flights = this.getFlightsByEndCountry();   break;
        	case 5: this.flights = this.getFlightsByDate();         break;
        	}
        	
        	this.filterFlights();
        },
        
        getFlightsByStartDest : function() {
        	let list = [];
        	
        	for (let flight of this.flights) {
        		if (flight.startDest.name.toLowerCase() === this.searchTerm.toLowerCase()) {
        			list.push(flight);
        		}
        	}
        	
        	return list;
        },
        
        getFlightsByEndDest : function() {
			let list = [];
			        	
        	for (let flight of this.flights) {
        		if (flight.endDest.name.toLowerCase() === this.searchTerm.toLowerCase()) {
        			list.push(flight);
        		}
        	}
        	
        	return list;
        },
        
        getFlightsByStartCountry : function() {
        	let list = [];
        	
        	for (let flight of this.flights) {
        		if (flight.startDest.country.toLowerCase() === this.searchTerm.toLowerCase()) {
        			list.push(flight);
        		}
        	}
        	
        	return list;
        },
        
        getFlightsByEndCountry : function() {
        	let list = [];
        	
        	for (let flight of this.flights) {
        		if (flight.endDest.country.toLowerCase() === this.searchTerm.toLowerCase()) {
        			list.push(flight);
        		}
        	}
        	
        	return list;
        },
        
        getFlightsByDate : function() {
        	let date = new Date(this.searchTermDate);
        	let list = [];
        	
    		date.setHours(0, 0, 0);
        	
        	for (let flight of this.flights) {
        		let flightDate = new Date(flight.flightDate);
        		flightDate.setHours(0, 0, 0);
        		
        		if (flightDate.getTime() === date.getTime()) {
        			list.push(flight);
        		}
        	}
        	
        	return list;
        },
        
        filterFlights : function(criteria) {
        	switch (Number.parseInt(this.filterCriteria)) {
        	case 0:                                                break;
        	case 1: this.flights.sort(this.dateComparator);        break;
        	case 2: this.flights.sort(this.flightClassComparator); break;
        	case 3: this.flights.sort(this.flightIdComparator);    break;
        	}
        },
        
        dateComparator : function(f1, f2) {
        	let flightDate1 = new Date(f1.flightDate);
        	flightDate1.setHours(0, 0, 0);
        	
        	let flightDate2 = new Date(f2.flightDate);
        	flightDate2.setHours(0, 0, 0);
        	
        	if (flightDate1.getTime() < flightDate2.getTime())
        		return 1;
        	else if (flightDate1.getTime() > flightDate2.getTime())
        		return -1;
        	
        	return 0;
        },
        
        flightClassComparator : function(f1, f2) {
        	if (f1.flightClass < f2.flightClass)
        		return -1;
        	else if (f1.flightClass > f2.flightClass)
        		return 1;
        	
        	return 0;
        },
        
        flightIdComparator : function(f1, f2) {
        	if (f1.flightId < f2.flightId)
        		return -1;
        	else if (f1.flightId > f2.flightId)
        		return 1;
        	
        	return 0;
        },

        selectCriteriaChange : function() {
        	if (Number.parseInt(this.searchCriteria) === 5) {
        		$("#input-field-search").hide();
        		$("#input-date-search").show();
        	} else {
        		$("#input-field-search").show();
        		$("#input-date-search").hide();
        	}
        },
        
        checkAllInputFields : function() {
            if (this.flightToAdd.flightId == null || this.flightToAdd.flightId === '') {
                toast('Morate uneti broj leta.');
                return false;
            } else if (this.flightToAdd.startDest == null) {
                toast('Morate uneti početnu destinaciju za let');
                return false;
            } else if (this.flightToAdd.endDest == null) {
                toast('Morate uneti krajnju destinaciju za let');
                return false;
            } else if (this.flightToAdd.ticketPrice == null) {
                toast('Niste uneli cenu karte');
                return false;
            } else if (this.flightToAdd.airplaneModel == null || this.flightToAdd.airplaneModel === '') {
                toast('Morate uneti model aviona');
                return false;
            } else if (this.flightToAdd.numFirstClassSeats == null) {
                toast('Niste uneli broj mesta u prvoj klasi');
                return false;
            } else if (this.flightToAdd.numBussinessClassSeats == null) {
                toast('Niste uneli broj mesta u biznis klasi');
                return false;
            } else if (this.flightToAdd.numEconomyClassSeats == null) {
                toast('Niste uneli broj mesta u ekonomskoj klasi');
                return false;
            } else if (this.flightToAdd.flightDate == null) {
                toast('Niste uneli datum');
                return false;
            } else if (this.flightToAdd.flightClass == null) {
                toast('Niste uneli klasu leta');
                return false;
            }

            return true;
        },

        copyDataIntoObject : function(toObj, fromObj) {
            toObj.flightId = fromObj.flightId;
            toObj.startDest = fromObj.startDest;
            toObj.endDest = fromObj.endDest;
            toObj.reservations = fromObj.reservations;
            toObj.ticketPrice = fromObj.ticketPrice;
            toObj.airplaneModel = fromObj.airplaneModel;
            toObj.numFirstClassSeats = fromObj.numFirstClassSeats;
            toObj.numBussinessClassSeats = fromObj.numBussinessClassSeats;
            toObj.numEconomyClassSeats = fromObj.numEconomyClassSeats;
            toObj.flightDate = fromObj.flightDate;
            toObj.flightClass = fromObj.flightClass;
        },
    },

    mounted() {
        this.getAllDestinations();
        this.getAllFlights();

        $('.modal').css('display', 'none');

        $('.close').on('click', function() {
        	$('.modal').css('display', 'none');
        });
        
        // Setting the minimal value (today) for date input fields
        var now = new Date(),
        minDate = now.toISOString().substring(0,10);
        $('.date-input').prop('min', minDate);
        
        $("#input-date-search").hide();
    }
});