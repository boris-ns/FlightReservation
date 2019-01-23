Vue.component('home-page', {
    data: function() {
        return {
        	currentComponent: 'my-reservations',
        }
    },

    props: [
        'user',
    ],

    template:
    `
    <div>
        <ul class="navbar">
    		<li><a href="#" v-on:click="showComponent('my-reservations')">Moje rezervacije</a></li>
            <li><a href="#" v-on:click="showComponent('reservation')">Rezerviši kartu</a></li>
            <li><a href="#" v-on:click="showComponent('profile-settings')">Podešavanja</a></li>
            <li><a href="#" v-on:click="logout()">Odjavi se</a></li>
    	</ul>

    	<h2>Dobrodošli, {{user.name}} {{user.surname}}</h2>

        <component :is="currentComponent" :user="user"></component>
    </div>
    `,

    methods: {
    	/** Switch between components for <component> tag */
    	showComponent : function(componentName) {
            this.currentComponent = componentName;
        },
        
    	logout : function() {
    		axios.get('rest/auth/logout').then(response => router.go('/'));
    	},
    },

    mounted() {

    }
});