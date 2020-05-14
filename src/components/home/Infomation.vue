<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="お知らせ"
    header-bg-variant="success"
    header-text-variant="white"
  >

    <b-card-text>
      <div class="mb-5" v-for="(post,i ) in posts" :key="i">
        <p class="mb-2 font-weight-bold">
          {{ post.newsDate | moment }}
        </p>
        <p>
          {{ post.newsComment }}
        </p>
      </div>
    </b-card-text>


  </b-card>
</template>

<script>
import moment from "moment";
export default {
  data(){
    return{
      posts:
        this.$store.state.newsPost
    }
  },
  filters: {
        moment: function (date) {
            return moment(date).format('YYYY/MM/DD HH:mm');
        }
    }
}
</script>