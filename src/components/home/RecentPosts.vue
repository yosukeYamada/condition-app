<template>
  <b-card
    border-variant="success"
    style="border-width:2px;"
    header="最近の投稿されたコンディション"
    header-bg-variant="success"
    header-text-variant="white"
  >
    <b-card-text>
      <div class="mb-5" v-for="(post,i ) in posts" :key="i">
        <p class="mb-2 font-weight-bold">
          <span class="mr-3">{{ post.date }}</span><span>{{ post.name + "さん" }}</span>
        </p>
        <p>
          <span class="mr-4"
            >やる気：<v-fa :icon="post.motivation.icon" :style="post.motivation.style"
          /></span>
          <span class="mr-4">体調：<v-fa :icon="post.condition.icon" :style="post.condition.style"
          /></span>
          <span class="mr-4">成果：<v-fa :icon="post.performance.icon" :style="post.performance.style"
          /></span>
          <span class="mr-4">{{ post.comment }}</span>
        </p>
      </div>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      posts: [
        {
          date: "2020-05-04 08:54",
          name: "ラクス太郎",
          motivation: {
            icon: ["fas", "sun"],
            style: { color: "#ea5550" },
          },
          condition: {
            icon: ["fas", "sun"],
            style: { color: "#ea5550" },
          },
          performance: {
            icon: ["fas", "sun"],
            style: { color: "#ea5550" },
          },
          comment:"やる気はあるけどお腹がすいた・・・。"
        },
        {
          date: "2020-05-04 08:54",
          name: "ラクスカル",
          motivation: {
            icon: ["fas", "sun"],
            style: { color: "#ea5550" },
          },
          condition: {
            icon: ["fas", "sun"],
            style: { color: "#ea5550" },
          },
          performance: {
            icon: ["fas", "cloud-showers-heavy"],
            style: { color: "#0075c2" },
          },
          comment:"お腹は満たされているがやる気は出ない！"
        },
      ],
    };
  },
};
</script>
