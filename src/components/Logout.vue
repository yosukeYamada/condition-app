<template>
  <span v-if="$store.state.login_user">
    <v-list-item-content>
    <v-list-item-avatar><img v-if="photoURL" :src="photoURL"></v-list-item-avatar>
      <v-list-item-title>{{ userName }}</v-list-item-title>
    </v-list-item-content>
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