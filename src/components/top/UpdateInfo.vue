<template>
  <b-col>
    <v-card tile outlined style="border-width:4px;">
      <v-card-text class="mx-2 mt-2">
        <div class="headline font-weight-black mb-4">{{ title }}</div>
        <div v-for="(c, i) in contents" :key="i" class="mb-2">
          <div class="font-weight-black">
            {{ c.date }}
          </div>
          <b-row>
            <div class="ml-4 px-2 mt-2 text-white" :style="c.style">{{ c.category }}</div>
            <div class="ml-4 py-2" v-html="c.content"></div>
          </b-row>
        </div>
      </v-card-text>
    </v-card>
  </b-col>
</template>
<script>
export default {
  data() {
    return {
      title: "News",
      contents: [
        {
          date: "2020.05.01",
          category: "News",
          style: { backgroundColor: "#28A745", height: "22px" },
          content: "Rakuppoのβ版をリリースしました。",
        },
        {
          date: "2020.05.08",
          category: "News",
          style: { backgroundColor: "#28A745", height: "22px" },
          content: "正式版のリリースに向けてバグの修正とUIの改善を行いました。",
        },
      ],
    };
  },
};
</script>
