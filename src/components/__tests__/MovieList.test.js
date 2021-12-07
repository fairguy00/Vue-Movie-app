import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import MovieList from '../MovieList'

const localVue = createLocalVue()// 모의 뷰객체 - 뷰객체를 전역화하지않기 위해
localVue.use(Vuetify)

describe('MovieList Component', ()=>{
    let wrapper
    beforeEach( ()=>{
        wrapper = shallowMount(MovieList,{
            localVue,
            mocks:{
                $store:{
                    state:{
                        movie:{
                            movies:[
                                {
                                    imdbID:'1234',
                                    Title:'영화 제목',
                                    Poster:'image.jpg',
                                    Year:'2020'
                                }
                            ]
                        }
                    }
                }
            }
        })
    })
    test('영화 제목 출력',()=>{
        console.log(wrapper.html())
    })
})