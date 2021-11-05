<template>
    <div>
        <!-- vuetify의 input tag -->
        <v-text-field
            v-model="title">

        </v-text-field>
    </div>
</template>
<script>
export default {
    data(){
        return{
            title:''
        }
    }
}
</script>