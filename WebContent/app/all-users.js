Vue.component('admin-all-users', {
    data: function() {
        return {
            users: [],
        }
    },

    template:
    `
    <div>
        <h3>Spisak svih korisnika</h3>
        
        <table>
            <tr>
                <th>Korisničko ime</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Broj telefona</th>
                <th>E-mail</th>
                <th>Tip</th>
                <th>Status</th>
            </tr>
            
            <tr v-for="u in users">
                <td>{{u.username}}</td>
                <td>{{u.name}}</td>
                <td>{{u.surname}}</td>
                <td>{{u.phoneNumber}}</td>
                <td>{{u.email}}</td>
                <td>{{u.type}}</td>
                <td>{{u.state}}</td>
                
                <td v-if="u.state === 'BLOCKED'">
                    <input type="button" value="Odblokiraj" v-on:click="unblockUser(u.username)" />
                </td>
                <td v-else-if="u.state === 'NORMAL'">
                    <input type="button" value="Blokiraj" v-on:click="blockUser(u.username)" />
                </td>
            </tr>
        </table>
    </div>
    `,

    methods: {
        getAllUsers : function() {
            axios.get('rest/data/getAllUsers').then(response => this.users = response.data);
        },

        unblockUser : function(username) {
            axios.post('rest/data/unblockUser', username, {headers: { 'Content-Type': 'text/plain' }})
            .then(response => {
                // Unblock user locally
                let userToUnblock = this.users.find(obj => obj.username === username);
                if (userToUnblock !== null) {
                    userToUnblock.state = 'NORMAL';
                }
            });
        },

        blockUser : function(username) {
            axios.post('rest/data/blockUser', username, {headers: { 'Content-Type': 'text/plain' }})
            .then(response => {
                if (response.data === "OK") {
                    // Block user locally
                    let userToBlock = this.users.find(obj => obj.username === username);
                    if (userToBlock !== null) {
                        userToBlock.state = 'BLOCKED';
                    }
                }
            });
        }
    },

    mounted() {
        this.getAllUsers();
    }
});