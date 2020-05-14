<template>
  <b-col>
    <v-card class="px-1" tile outlined style="border-width:4px;">
      <v-card-text class="mt-2">
        <div class="headline font-weight-black mb-4">{{ title }}</div>
        <div v-for="(c, i) in contents" :key="i" class="mb-2">
          <div class="font-weight-black">
            {{ c.date }}
          </div>
          <b-row class="px-4">
            <div class="px-2 mt-2 text-white mr-4" :style="c.style">
              {{ c.category }}
            </div>
            <div class="py-2" v-html="c.content"></div>
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
          style: { backgroundColor: "#28A745", height: "22px", width: "54px" },
          content: "Rakuppoのβ版をリリースしました。",
        },
        {
          date: "2020.05.08",
          category: "News",
          style: { backgroundColor: "#28A745", height: "22px", width: "54px" },
          content: "正式版のリリースに向けてバグの修正とUIの改善を行いました。",
        },
      ],
    };
  },
};
</script>
