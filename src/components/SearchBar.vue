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
      async searchMovies (){
          this.loading = true
          const res = await axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${this.title}`)//promise객체반환 - 비동기
          console.log(res.data)
          this.loading = false //속도가 빠르므로 chrome 개발자도구 > network > 제한없음에서 느린3g로 변경
      }
  }
};
</script>
