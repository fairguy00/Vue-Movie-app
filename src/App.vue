<template>
<!-- 뷰티파이기능이 전역적으로 사용가능하므로 script 에 임포트 안하고 사용가능하다 
v-app 가 최상위 컴포넌트 그러므로 v-app 안에만 태그가 유효함-->
  <v-app>
    <v-container>
      <!-- 검색바 -->
      <search-bar/>
      <!-- 영화목록 -->
      <movie-list/>
    </v-container>
  </v-app>
</template>

<script>
import SearchBar from '@/components/SearchBar'
import MovieList from '@/components/MovieList'

export default{
  components:{
    SearchBar,
    MovieList
  }
}
</script>
