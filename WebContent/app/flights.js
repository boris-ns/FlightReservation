Vue.component('admin-flights', {
    data: function() {
        return {
            flights: [],
        }
    },

    template:
    `
    <div>
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
        }
    },

    mounted() {
        this.getAllFlights();
    }
});