<template>
  <span v-if="$store.state.login_user">
    <v-btn color="info" @click="logout">ログアウト</v-btn>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
   methods: {
        ...mapActions(['logout'])
   },
}
</script>