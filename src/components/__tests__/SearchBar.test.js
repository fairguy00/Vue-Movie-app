import { mount, createLocalVue } from "@vue/test-utils"
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import store from '@/store'// 실제로 사용하는 스토어
import SearchBar from '../SearchBar.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)
//localVue.use(Vuex)

// 가짜 스토어 만들어서 사용할때
// const store = new Vuex.Store({
//     modules: {
        
//     }
// })

describe('SearchBar Component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(SearchBar, {
            localVue,
            store
        })
    })

    test('제목 입력했을 때 스토어 업데이트', () => {
        wrapper.vm.title = 'lion'
        expect(wrapper.vm.title).toBe('lion')
    })

    test('로딩 중 아이콘 확인', async () => {
        wrapper.vm.$store.commit('movie/updateState', {
            loading : true
        })
        // shallowMount는 하위 컴포넌트들 ex)v-text-field 가 stub 처리된다
        // stub처리된것은 가짜로 인식되어 로직(ex loading)이 돌아가지 않는다
        console.log(wrapper.html())
        await wrapper.vm.$nextTick() // 화면 갱신 보장
        expect(wrapper.find('.v-progress-circular').exists()).toBe(true)//css class 선택자는 .으로 시작
    })
})