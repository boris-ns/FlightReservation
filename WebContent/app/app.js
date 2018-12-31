/* Components */
const compLogin = { template: '<login></login>' };
const compRegistration = { template: '<registration></registration>' };

const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: compLogin },
        { path: '/registration', component: compRegistration }
    ]
});

let app = new Vue({
    router, 
    el: '#flightReservation'
});