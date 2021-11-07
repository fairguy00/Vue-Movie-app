<template>
  <div>
    <!-- vuetify의 input tag -->
    <v-text-field 
        v-model="title" 
        outlined
        @keypress.enter="searchMovies">
        <template v-slot:prepend-inner>
            <v-icon>search</v-icon>
        </template>
        <template v-slot:append>
            <v-progress-circular
                v-if="loading"
                size="24"
                color="primary"
                indeterminate
            />
        </template>    
    </v-text-field>
  </div>
</template>
<script>
import axios from 'axios'//Promise based HTTP client

export default {
  data() {
    return {
      title: "",
      loading: false
    };
  },
  methods:{
      searchMovies (){
          
          axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${this.title}`)
            .then( res => {
              console.log(res)
            }
          )//promise - 비동기

          console.log("searchMovies") //axios 보다 먼저 찍힘 > axis는 비동기클라이언트이기때문
      }
  }
};
</script>
