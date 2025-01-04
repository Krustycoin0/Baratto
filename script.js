// script.js

// Firebase Config (Incollalo qui)
const firebaseConfig = {
// Inserisci qui le tue configurazioni Firebase
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var app = new Vue({
  el: '#app',
  data: {
    user: null,
    loading: true,
    articles: [],
    filteredCategory: 'all',
    showLoginModalFlag: false,
    showRegisterModalFlag: false,
    loginEmail: "",
    loginPassword:"",
    registerName:"",
    registerEmail:"",
    registerPassword:"",
    offeredItem: "",
    selectedArticolo:null,
    showScambioModalFlag:false,
  },
      components: {
              'modal': () => import('./components/Modal.vue')
                },
    computed:{
        filteredArticoli(){
          if(this.filteredCategory == 'all') return this.articles;
          return this.articles.filter(article => article.categoria == this.filteredCategory)
      }
    },
    methods: {
        showLoginModal() {
          this.showLoginModalFlag = true;
          this.$refs.loginModal.openModal();
      },
      showRegisterModal() {
         this.showRegisterModalFlag = true;
        this.$refs.registerModal.openModal();
      },
      async login() {
        try {
          await firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword);
            this.showLoginModalFlag = false;
           this.$refs.loginModal.closeModal();
          this.loginEmail = "";
          this.loginPassword = "";
        } catch (error) {
          alert("Errore durante il login: " + error.message);
          console.error("Errore durante il login", error)
        }
      },
     async register() {
          try {
            await firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword);
            const user = firebase.auth().currentUser;
            await user.updateProfile({
            displayName: this.registerName
            });
             this.showRegisterModalFlag = false;
            this.$refs.registerModal.closeModal();
            this.registerName="";
            this.registerEmail = "";
            this.registerPassword ="";
          } catch (error) {
             alert("Errore durante la registrazione: " + error.message);
              console.error("Errore durante la registrazione", error)
            }
      },
      logout() {
        firebase.auth().signOut();
      },
      filterCategory(category) {
        this.filteredCategory = category
      },
      showScambioModal(articolo){
        this.selectedArticolo = articolo;
          this.showScambioModalFlag = true;
        this.$refs.scambioModal.openModal();

      },
      async eseguiScambio(){
        if(this.offeredItem){
            //qui puoi salvare in un database lo scambio
          this.offeredItem = "";
          this.showScambioModalFlag = false;
          this.$refs.scambioModal.closeModal();
          alert("Scambio registrato")
        }
         else{
          alert("Inserisci un articolo da offrire")
         }
    }
  },
  created(){
      firebase.auth().onAuthStateChanged(user => {
          this.user = user;
          });
      db.collection('articles').onSnapshot(querySnapshot => {
        this.articles = [];
        querySnapshot.forEach(doc => {
          this.articles.push({id:doc.id, ...doc.data()});
        });
         this.loading = false;
      });
}
});
