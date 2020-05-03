<template>
  <b-card>
    <b-card-text>グラフのカラーと項目の対応</b-card-text>
    <b-card-text>
      <b-row>
        <b-col class="text-center" v-for="(item, i) in items" :key="i">
          <v-fa :icon="item.icon" size="2x" :style="item.style"></v-fa>
          <div>{{ item.name }}</div>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          icon: ["fas", "sun"],
          style: { color: "#ea5550" },
          name: "快晴",
        },
        {
          icon: ["fas", "cloud-sun"],
          style: { color: "#f3981d" },
          name: "晴れ",
        },
        {
          icon: ["fas", "cloud"],
          style: { color: "#b2cbe4" },
          name: "曇り",
        },
        {
          icon: ["fas", "cloud-rain"],
          style: { color: "#68a4d9" },
          name: "雨",
        },
        {
          icon: ["fas", "cloud-showers-heavy"],
          style: { color: "#0075c2" },
          name: "大雨",
        },
      ],
    };
  },
};
</script>
