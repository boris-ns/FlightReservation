Vue.component('admin-destinations', {
    data: function() {
        return {
            destinations: [],
        }
    },

    template:
    `
    <div>

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

        activateDestination : function(destinatinoName) {

        }

    },

    mounted() {
        this.getAllDestinations();
    }
});