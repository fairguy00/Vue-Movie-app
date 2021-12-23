import movie from '../movie'

describe('movie store', () => {
    let store
    beforeEach(() => {
        store = movie
        store.state = movie.state()
        // this.$store.commit('뮤테이션이름', 업데이트할값==payload)
        store.commit = function (name, payload) {
            store.mutations[name](store.state, payload)
        }
    })
    test('state 업데이트', () => {
        //const state = movie.state()
        // movie.mutations.updateState(state, {
        //     loading:true
        // })
        store.commit('updateState', {
            title: 'Hello',
            movies:[1,2,3],
            loading : true  
        })
        expect(store.state.title).toBe('Hello')
        expect(store.state.movies).toEqual([1,2,3])
        expect(store.state.loading).toBe(true)
    })
})