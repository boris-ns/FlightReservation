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
        <h1>Welcome {{user.name}}</h1>
    </div>
    `,

    methods: {

    },

    mounted() {

    }
});