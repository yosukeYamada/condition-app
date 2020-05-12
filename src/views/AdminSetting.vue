<template>
  <b-container>
    <b-row align-v="center" align-h="center">
      <b-col>
        <h2 class="mb-4">管理者設定</h2>
        <b-row>
          <AdminSetting />
        </b-row>
        <b-row>
          <NewsPostSetting />
        </b-row>
        <b-row>
          <Setting2 />
        </b-row>
        <img
          class="float-right"
          width="50"
          @click="rakuscal(rakuscalCount)"
          :src="rakuscalImage"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AdminSetting from "@/components/admin-setting/AdminSetting";
import NewsPostSetting from "@/components/admin-setting/NewsPostSetting";
import Setting2 from "@/components/admin-setting/Setting2";

export default {
  components: {
    AdminSetting,
    NewsPostSetting,
    Setting2,
  },
  data() {
    return {
      rakuscalCount: 1,
      rakuscalImage: "/rakuscal.png",
    };
  },

  methods: {
    rakuscal(rakuscalCount) {
      if (rakuscalCount === 1) {
        alert("ラクスカル「よくも見つけてくれたな！！！」");
        this.rakuscalCount++;
      } else if (rakuscalCount === 2) {
        alert("ラクスカル「ひまなのかい・・・？」");
        this.rakuscalCount++;
      } else if (rakuscalCount === 3) {
        alert("ラクスカル「勉強しいや〜」");
        this.rakuscalCount++;
      } else {
        alert("ラクスカル「もう話すことはないよ〜〜！」");
        this.rakuscalImage = "/rakuscal_clear.png";
      }
    },
  },
};
</script>
