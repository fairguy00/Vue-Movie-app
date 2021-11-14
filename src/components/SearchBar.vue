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
//import axios from 'axios'//Promise based HTTP client
import {mapActions} from 'vuex'

export default {
  // data() {
  //   return {
  //     title: "",
  //     loading: false // state를 가져오려면 computed사용
  //   };
  // },
  name: 'SearchBar',
  computed:{
    title: {
      // input이므로 양방향 바인딩 - 수정은 mutation 의 getter,setter 필요하다
      get(){
        return this.$store.state.movie.title
      },
      set(title){
        this.$store.commit('movie/updateState',{
          title
        })
      }
    },
    loading(){
      return this.$store.state.movie.loading
    }
  },

  methods:{
      // searchMovies (){
      //     // this.loading = true
      //     // const res = await axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${this.title}`)//promise객체반환 - 비동기
      //     // console.log(res.data)
      //     // this.loading = false //속도가 빠르므로 chrome 개발자도구 > network > 제한없음에서 느린3g로 변경
      //   this.$store.dispatch('movies/searchMovies')  //actions 실행은 dispatch(네임스페이스)
      // }

      //위코드를 맵액션스로 실행 ... > 전개연산자 로 바인딩
      ...mapActions('movie',[
        'searchMovies'
      ])


  }
};
</script>
