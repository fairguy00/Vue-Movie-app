<template>
    <v-row
        v-masonry
        item-selector=".item">

        <!-- 반복되는 아이템들 -->
        <v-col v-for="movie in movies"
            :key="movie.imdbID"
            v-masonry-tile
            class="item"
            cols="12"
            lg="3"
            md="3"
            sm="6">
            <v-card>
                <v-img
                    :src="posterSrc(movie.Poster)"
                    :alt="movie.Title"
                    :height="posterHeight(movie.Poster)"></v-img>
                <v-card-title>
                    {{movie.Title}}
                </v-card-title>
                <v-card-subtitle>
                    {{movie.Year}}
                </v-card-subtitle>
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
export default {
    computed:{
        movies(){
            return this.$store.state.movie.movies
        }
    },
    methods:{
        posterSrc(poster){
            return poster === 'N/A' ? '': poster
        },
        posterHeight(poster){
            return poster === 'N/A' ? 100 : 300
        }
    }
}
</script>