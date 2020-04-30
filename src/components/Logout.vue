<template>
  <span v-if="$store.state.login_user">
    <span>{{userName}}</span>
    <img v-if="photoURL" :src="photoURL">
    <v-btn color="info" @click="logout">ログアウト</v-btn>
  </span>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

export default {
   methods: {
        ...mapActions(['logout'])
   },
   computed: {
    ...mapGetters(['userName', 'photoURL'])
  }
}
</script>