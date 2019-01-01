Vue.component('home-page', {
    data: function() {
        return {

        }
    },

    props: [
        'user',
    ],

    template:
    `
    <div>
        <div>
            <ul>
            	<h1>Ovo je prikaz za korisnika</h1>
                <li>Hello, {{user.name}} {{user.surname}}</li>
                <li><a href="#">Rezerviši kartu</a></li>
                <li><a href="#/reservations">Moje rezervacije</a></li>
                <li><a href="#/settings">Podešavanja</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </div>
    </div>
    `,

    methods: {

    },

    mounted() {

    }
});