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
        },
        pushIntoMovies(state, movies) {
            state.movies.push(...movies)//아이템단위로 push 할수있도록 전개연산자사용
        }
    },
    actions: {//비동기처리가능, state의 값을 갱신하려면 mutations
        fetchMovies({state, commit}, pageNum) {
            const promise = new Promise(resolve => {
                const res = axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${state.title}&page=${pageNum}`)
                resolve(res)//리졸브에 인수로 데이터를 넣으면 밖에서 반환받아 사용가능
            })
            return promise.then(res => {
                res.data
                commit('pushIntoMovies',res.data.Search)
                //console.log("res.data: "+res.data)
            })
            
        },
        async searchMovies ({commit,dispatch}){//actions 사용할땐 dispatch
            //state.loading = true
            commit('updateState',{
                loading: true,
                movies:[]
            })
            const { totalResults } = await dispatch('fetchMovies',1)
            //const res = await axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${state.title}&page=1`)//promise객체반환 - 비동기
            const pageLength = Math.ceil(totalResults / 10)

            if (pageLength > 1) {
                for (let i = 2; i <= pageLength; i += 1){
                    if(i > 4) break
                    // const resMore = await axios.get(`http://www.omdbapi.com/?apikey=a08e2e9&s=${state.title}&page=${i}`)
                    // commit('pushIntoMovies', resMore.data.Search)
                    await dispatch('fetchMovies', i)
                }
            }
            //state.loading = false //속도가 빠르므로 chrome 개발자도구 > network > 제한없음에서 느린3g로 변경
            commit('updateState', {
                //res 값을 MovieList에서 사용
                //state.movie = res.data.Search //
                //movies : res.data.Search,
                
                loading: false
            })
        }
    }
}