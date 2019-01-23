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
    	
    	<table class="table-data">
    		<tr>
    			<th>ID</th>
    			<th>Datum i vreme rezervacije</th>
    			<th>Klasa rezervacije</th>
    			<th>Broj karata</th>
    			<th>Otkazivanje</th>
    		</tr>

    		<tr v-for="r of reservations">
    			<td>{{r.reservationId}}</td>
    			<td>{{convertDate(r.dateTime)}}</td>
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
        	axios.get('rest/data/cancelReservation/' + reservationToCancel.reservationId)
        	.then (response => {
        		if (response.data == '') {
        			toast('Došlo je do greške prilikom otkazivanja rezervacije');
        			return;
        		}
        		
        		const indexOfReservation = this.reservations.findIndex(obj => 
        			obj.reservationId === reservationToCancel.reservationId);
                this.reservations.splice(indexOfReservation, 1);
        	});
        },
        
        convertDate : function(milliseconds) {
            let date = new Date(milliseconds);
            return date.toUTCString();
        },
    },

    mounted() {
    	this.getAllReservations();
    }
});