Vue.component('admin-flights', {
    data: function() {
        return {
            flights: [],
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
        }
    },

    template:
    `
    <div>
        <input type="button" value="Dodavanje leta" v-on:click="toggleFlightComponent()" />
        <div id="addFlight">
            <p>Popunite sledeća polja za unos leta</p>
            
            <table>
                <tr><input type="text" placeholder="Broj leta (ID)" v-model="flightToAdd.flightId" /></tr>
                
                <tr>
                    Početna destinacija
                    <select v-model="flightToAdd.startDest">
                    <option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
                    </select>
                </tr>

                <tr>
                    Krajnja destinacija:
                    <select v-model="flightToAdd.endDest">
                    <option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
                    </select>
                </tr>

                <tr><input type="number" placeholder="Cena karte"                    v-model="flightToAdd.ticketPrice"            min="0" /></tr>
                <tr><input type="text"   placeholder="Model aviona"                  v-model="flightToAdd.airplaneModel"          /></tr>
                <tr><input type="number" placeholder="Broj mesta u prvoj klasi"      v-model="flightToAdd.numFirstClassSeats"     min="0" /></tr>
                <tr><input type="number" placeholder="Broj mesta u biznis klasi"     v-model="flightToAdd.numBussinessClassSeats" min="0" /></tr>
                <tr><input type="number" placeholder="Broj mesta u ekonomskoj klasi" v-model="flightToAdd.numEconomyClassSeats"   min="0" /></tr>
                <tr><input type="date"   placeholder="Datum leta"                    v-model="flightToAdd.flightDate"             /></tr>

                <tr>
                    Klasa leta:
                    <select v-model="flightToAdd.flightClass">
                        <option value="CHARTER">Čarter</option>
                        <option value="REGIONAL">Regionalni</option>
                        <option value="OVERSEAS">Prekookeanski</option>
                    </select>
                </tr>
                
                <tr><input type="button" value="Dodaj" v-on:click="addFlight()" /></tr>
            </table>
        </div>

        <div id="editFlightForm">
            <table>
                <tr><input type="text"   placeholder="Broj leta (ID)" v-model="backupFlight.flightId" /></tr>
                
                <tr>
                    Početna destinacija
                    <select v-model="backupFlight.startDest">
                        <option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
                    </select>
                </tr>

                <tr>
                    Krajnja destinacija:
                    <select v-model="backupFlight.endDest">
                        <option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
                    </select>
                </tr>

                <tr><input type="number" placeholder="Cena karte"                    v-model="backupFlight.ticketPrice"            min="0" /></tr>
                <tr><input type="text"   placeholder="Model aviona"                  v-model="backupFlight.airplaneModel"          /></tr>
                <tr><input type="number" placeholder="Broj mesta u prvoj klasi"      v-model="backupFlight.numFirstClassSeats"     min="0" /></tr>
                <tr><input type="number" placeholder="Broj mesta u biznis klasi"     v-model="backupFlight.numBussinessClassSeats" min="0" /></tr>
                <tr><input type="number" placeholder="Broj mesta u ekonomskoj klasi" v-model="backupFlight.numEconomyClassSeats"   min="0" /></tr>
                <tr><input type="date"   placeholder="Datum leta"                    v-model="backupFlight.flightDate"             /></tr>

                <tr>
                    Klasa leta:
                    <select v-model="backupFlight.flightClass">
                        <option value="CHARTER">Čarter</option>
                        <option value="REGIONAL">Regionalni</option>
                        <option value="OVERSEAS">Prekookeanski</option>
                    </select>
                </tr>
                
                <tr><input type="button" value="Izmeni"  v-on:click="editFlight()" /></tr>
                <tr><input type="button" value="Poništi" v-on:click="onCancelEdit()" /></tr>
            </table> 
        </div>

        <h3>Spisak svih letova</h3>

        <table>
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
            $('#addFlight').toggle();
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

            $('#editFlightForm').show();
        },

        onCancelEdit : function() {
            $('#editFlightForm').hide();
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
                $('#editFlightForm').hide();
                this.editingEnabled = false;
            });
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
        $('#addFlight').hide();
        $('#editFlightForm').hide();
    }
});