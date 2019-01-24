Vue.component('reservation', {
    data: function() {
        return {
        	destinations: [],
        	startDest: null,
        	endDest: null,
        	flightDate: null,
        	flights: [],
        	flightsToShow: [],
        	flightReservation: null,
        	reservation: {
        		reservationId: null,
        		user: null,
        		dateTime: null,
        		numberOfPassengers: null,
        		reservationClass: null,
        	},
        }
    },

    template:
    `
    <div>
    	<h1>Rezervisanje karte</h1>
    	
    	<div id="findFlightsForm">
    		<table>
    			<tr>
                    <td>Početna destinacija</td>
                    <td>
	                    <select v-model="startDest">
	                    	<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
	                    </select>
	                </td>
                </tr>
                <tr>
                    <td>Krajnja destinacija</td>
                    <td>
                    	<select v-model="endDest">
                    		<option v-for="dest in destinations" :value="dest">{{dest.name}} {{dest.airportName}}</option>
                    	</select>
                    </td>
                </tr>
                <tr>
                	<td>Datum leta</td>
                	<td><input type="date" v-model="flightDate" /></td>
               	</tr>
                <tr>
                	<th colspan="2"><input type="button" value="Pronađi" v-on:click="onClickFindFlights()" /></th>
                </tr>
    		</table>
    	</div>
    	
    	<div id="searchedFlights">
    		<h2>Pronađeni letovi</h2>
    		
    		<table class="table-data">
    			<tr>
    				<th>Početni aerodrom</th>
    				<th>Kod aerodroma</th>
    				<th>Krajnji aerodrom</th>
    				<th>Kod aerodroma</th>
    				<th>ID leta</th>
    				<th>Model aviona</th>
    				<th>Cena karte</th>
    				<th>Klasa leta</th>
    				<th>&nbsp;</th>
    			</tr>
    			
    			<tr v-for="f of flightsToShow">
			    	<td>{{f.startDest.airportName}}</td>
			    	<td>{{f.startDest.airportCode}}</td>
			    	<td>{{f.endDest.airportName}}</td>
			    	<td>{{f.endDest.airportCode}}</td>
			    	<td>{{f.flightId}}</td>
			    	<td>{{f.airplaneModel}}</td>
			    	<td>{{f.ticketPrice}}</td>
			    	<td>{{f.flightClass}}</td>
    				<td><input type="button" value="Rezerviši" v-on:click="openReserveForm(f)" /></td>
    			</tr>
    		</table>
    	</div>
    	
    	<div id="reserveFlightForm" class="modal">
    		<div class="modal-content">
	    		<span class="close">&times;</span>
	    		<table>
	    			<tr>
	    				<td>Klasa rezervacije:</td>
	    				<td>
	    					<select v-model="reservation.reservationClass">
	    						<option value="FIRST_CLASS">Prva klasa</option>
	    						<option value="BUSSINESS_CLASS">Biznis klasa</option>
	    						<option value="ECONOMY_CLASS">Ekonomska klasa</option>
	    					</select>
	    				</td>
	    			</tr>
	    			<tr>
	    				<td>Broj putnika</td>
	    				<td>
	    					<input type="number" min="1" v-model="reservation.numberOfPassengers" />
	    				</td>
	    			</tr>
			    	<tr>
			    		<th colspan="2"><input type="button" value="Rezerviši" v-on:click="reserveTicket()" /></th>
			    	</tr>
	    		</table>
	    	</div>
    	</div>
    </div>
    `,

    methods: {
        getAllDestinations : function() {
        	axios.get('rest/data/getAllDestinations').then(response => this.destinations = response.data);
        },
        
        getAllFlights : function() {
        	axios.get('rest/data/getAllFlights').then(response => this.flights = response.data);
        },
        
        onClickFindFlights : function() {
        	if (!this.checkInputFieldsSearch()) {
        		return;
        	}
        	
        	let usersDate = new Date(this.flightDate);
        	usersDate.setHours(0, 0, 0);
    		
        	for (let flight of this.flights) {
        		let flightDate = new Date(flight.flightDate);
        		flightDate.setHours(0, 0, 0);
        		
        		if (flight.startDest.name === this.startDest.name && 
        				flight.endDest.name === this.endDest.name &&
        				flightDate.getTime() === usersDate.getTime()) {
        			
        			this.flightsToShow.push(flight);
        		}
        	}
        	
        	$("#searchedFlights").show();
        },
        
        openReserveForm : function(flight) {
        	this.flightReservation = flight;
        	$("#reserveFlightForm").css('display', 'block');
        },
        
        reserveTicket : function() {
        	let ticket = {
        		reservation: this.reservation,
        		flight: this.flightReservation
        	};
        	
        	axios.post('rest/data/reserveTicket', ticket)
        	.then(response => {
        		if (response.data == '') {
        			toast('Nema dovoljno slobodnih mesta za ovu klasu rezervacije');
        			return;
        		}
        		
        		$("#reserveFlightForm").css('display', 'none');
        	});
        },
        
        checkInputFieldsSearch : function() {
        	if (this.startDest == null) {
        		toast('Morate odabrati početnu destinaciju');
        		return false;
        	} else if (this.endDest == null) {
        		toast('Morate odabrati krajnju destinaciju');
        		return false;
        	} else if (this.flightDate == null) {
        		toast('Morate odabrati datum polaska leta');
        		return false;
        	}
        	
        	return true;
        },
    },

    mounted() {
    	$("#searchedFlights").hide();
    	this.getAllDestinations();
    	this.getAllFlights();
    	
    	$('.modal').css('display', 'none');

        $('.close').on('click', function() {
        	$('.modal').css('display', 'none');
        });
    }
});