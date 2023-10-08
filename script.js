const { createApp } = Vue;

createApp({
  data(){
    return{
      titolo: 'Generatore di Indirizzi Email',
      emails: [] // Inizializza un array per contenere gli indirizzi email
    }
  },

  methods:{
    getApi(){
      const numEmails = 10;
      const apiUrl = 'https://flynn.boolean.careers/exercises/api/random/mail'; // URL dell'API

      const requests = []; // Inizializza un array per le richieste HTTP

      // Effettua 10 richieste HTTP e le aggiunge all'array 'requests'
      for (let i = 0; i < numEmails; i++) {
        requests.push(axios.get(apiUrl));
      }

      // Attende che tutte le richieste siano completate
      axios.all(requests)
        .then(responsesArray => {
          // Cicla attraverso l'array di risposte delle richieste
          for (let i = 0; i < responsesArray.length; i++) {
            const response = responsesArray[i];
            // Estrae l'indirizzo email dalla risposta e lo aggiunge all'array 'emails'
            this.emails.push(response.data.response);
          }
        })
        .catch((errore) => {
          console.log(errore);
        });
    }
  },

  mounted(){
    this.getApi();
  }
}).mount('#app');
