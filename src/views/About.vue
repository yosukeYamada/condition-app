<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-text-field name="aaa" v-model="testMessage"/>
  </div>
</template>
<script>
export default {
  name:"About",
  data(){
    return{
      testMessage:""
    }
  }
}
</script>
