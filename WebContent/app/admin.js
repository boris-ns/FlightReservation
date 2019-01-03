Vue.component('admin-page', {
    data: function() {
        return {
            currentComponent: 'admin-all-users',
        }
    },

    props: [
        'user',
    ],

    template:
    `
    <div>

        <img :src="user.imagePath" alt="Profilna slika nedostupna" />

        <ul>
            <li>Admin: {{user.name}} {{user.surname}}</li> 
            <li><a href="#" v-on:click="showComponent('admin-all-users')">Korisnici</a></li>
            <li><a href="#" v-on:click="showComponent('admin-destinations')">Destinacije</a></li>
            <li><a href="#">Letovi</a></li>
            <li><a href="#" v-on:click="showComponent('profile-settings')">Podešavanja</a></li>
            <li><a href="#" v-on:click="logout()">Logout</a></li>
        </ul>

        <h1>Ovo je admin stranica</h1>

        <component :is="currentComponent" :user="user"></component>

    </div>
    `,

    methods: {
        /** Switch between components for <component> tag */
    	showComponent : function(componentName) {
            this.currentComponent = componentName;
        },

        /** Http request for logout */
        logout : function() {
    		axios.get('rest/auth/logout').then(response => router.go('/'));
        },
        
    },

    mounted() {

    }
});