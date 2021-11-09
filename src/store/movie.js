import axios from 'axios'

export default{
    
    //네임스페이스
    //사용 예 this.$store.dispatch('movies/searchMovies')
    namespaced : true,

    //state는 데이터
    state: () =>({
        title:'',
        loading: false,
        movies:[]
    }),
    getters:{},
    mutations:{//비동기처리 불가
        updateState(state, payload){//actions 에 만들때마다 만들순 없으므로 범용적인거 하나 만들자 //payload - mutations의 두번째 인수를 칭함
            Object.keys(payload).forEach(key =>{
                state[key] = payload[key] //loading = true
            })
        }
    },
    actions:{//비동기처리가능, state의 값을 갱신하려면 mutations
        async searchMovies ({state,commit}){
            //state.loading = true
            commit('updateState',{
                loading:true
            })

            const res = await axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${state.title}`)//promise객체반환 - 비동기
            
            //state.loading = false //속도가 빠르므로 chrome 개발자도구 > network > 제한없음에서 느린3g로 변경
            commit('updateState', {
                //res 값을 MovieList에서 사용
                //state.movie = res.data.Search //
                movies : res.data.Search,
                loading:false
            })
        }
    }
}