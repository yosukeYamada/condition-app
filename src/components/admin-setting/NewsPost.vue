<template>
  <b-modal id="news-post" centered title="お知らせの投稿">
    <v-subheader>
      <b-row>
        <b-col sm="10" class="pr-0 pb-1">
          <b-form-input
          v-model="inputNews"
            type="textarea"
            size="sm"
            placeholder="お知らせを追加"
            required
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="pb-1">
          <b-button size="sm" @click="addNews">投稿</b-button>
        </b-col>
      </b-row>
    </v-subheader>
  </b-modal>
</template>

<script>
export default {
  data(){
    return{
      inputNews:""
    };
  },
  methods:{
    addNews(){
      
    }
  }
}
</script>
