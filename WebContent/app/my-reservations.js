Vue.component('my-reservations', {
    data: function() {
        return {
        	reservations: [],
        }
    },

    template:
    `
    <div>
    	<h1>Moje rezervacije</h1>
    	
    	<table>
    		<tr>
    			<th>ID</th>
    			<th>Datum i vreme rezervacije</th>
    			<th>Klasa rezervacije</th>
    			<th>Broj karata</th>
    			<th>Otkazivanje</th>
    		</tr>

    		<tr v-for="r of reservations">
    			<td>{{r.reservationId}}</td>
    			<td>{{r.dateTime}}</td>
    			<td>{{r.reservationClass}}</td>
    			<td>{{r.numberOfPassengers}}</td>
    			<td><input type="button" value="Otkaži" v-on:click="cancelReservation(r)" /></td>
    		</tr>
    	</table>
    </div>
    `,

    methods: {
        getAllReservations : function() {
        	axios.get('rest/data/getReservations').then(response => this.reservations = response.data);
        },
        
        cancelReservation : function(reservationToCancel) {
        	console.log(reservationToCancel);
        }
    },

    mounted() {
    	this.getAllReservations();
    }
});