new Vue({
    el: '#app',
    data: {
        user: '',
        articoli: [],
        selectedArticolo: '',
        loginModal: false,
        registerModal: false,
        scambioModal: false
    },
    methods: {
        login() {
            // fetch API per effettuare il login
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                })
            })
            .then(response => response.json())
            .then(data => {
                this.user = data.user;
                this.loginModal = false;
            });
        },
        register() {
            // fetch API per effettuare la registrazione
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                })
            })
            .then(response => response.json())
            .then(data => {
                this.user = data.user;
                this.registerModal = false;
            });
        },
        scambia() {
            // fetch API per effettuare lo scambio
            fetch('/api/scambio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articolo: this.selectedArticolo,
                    offerta: document.getElementById('offerta').value
                })
            })
            .then(response => response.json())
            .then(data => {
                this.scambioModal = false;
            });
        },
        openLoginModal() {
            this.loginModal = true;
        },
        closeLoginModal() {
            this.loginModal = false;
        },
        openRegisterModal() {
            this.registerModal = true;
        },
        closeRegisterModal() {
            this.registerModal = false;
        },
        openScambioModal(articolo) {
            this.selectedArticolo = articolo;
            this.scambioModal = true;
        },
        closeScambioModal() {
            this.scambioModal = false;
        }
    }
});
