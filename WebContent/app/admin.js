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
        <ul class="navbar">
            <li><a href="#" v-on:click="showComponent('admin-all-users')">Korisnici</a></li>
            <li><a href="#" v-on:click="showComponent('admin-destinations')">Destinacije</a></li>
            <li><a href="#" v-on:click="showComponent('admin-flights')">Letovi</a></li>
            <li><a href="#" v-on:click="showComponent('profile-settings')">Podešavanja</a></li>
            <li><a href="#" v-on:click="logout()">Odjavi se</a></li>
        </ul>

    	<img :src="user.imagePath" alt="Profilna slika nedostupna" />

    	<h3>Dobrodošli, {{user.name}} {{user.surname}}</h3>

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