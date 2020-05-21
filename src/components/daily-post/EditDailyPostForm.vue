<template>
  <div>
    <b-col>
      <b-card
        class="text-left"
        border-variant="success"
        style="border-width:2px;"
        header="今日のコンディション編集"
        header-bg-variant="success"
        header-text-variant="white"
      >
        <b-card-text class="pt-2">
          <b-form>
            <b-form-group
              class="pt-4"
              label="今日のモチベーションはどれくらいですか？"
            >
              <b-form-radio-group v-model="param.motivationSelected">
                <b-form-radio
                  class="pr-5 pb-4"
                  v-for="(item, i) in radioItems"
                  :key="i"
                  :value="item.value"
                  ><v-fa :icon="item.icon" size="2x" :style="item.style"
                /></b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group class="pt-4" label="今日の体調はどうですか？">
              <b-form-radio-group v-model="param.conditionSelected">
                <b-form-radio
                  class="pr-5 pb-4"
                  v-for="(item, i) in radioItems"
                  :key="i"
                  :value="item.value"
                  ><v-fa :icon="item.icon" size="2x" :style="item.style"
                /></b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              class="pt-4"
              label="今日やることの目標のイメージはできていますか？"
            >
              <b-form-radio-group v-model="param.performanceSelected">
                <b-form-radio
                  class="pr-5 pb-4"
                  v-for="(item, i) in radioItems"
                  :key="i"
                  :value="item.value"
                  ><v-fa :icon="item.icon" size="2x" :style="item.style"
                /></b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group
              class="mb-4"
              label="なにかコメントはありますか？"
              label-for="input-comment"
            >
              <b-form-textarea
                class="mt-3"
                id="input-comment"
                v-model="param.comment"
                placeholder="コメントがあれば入力してください"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <b-button variant="outline-success" @click.prevent="register()"
              >変更する</b-button
            >
          </b-form>
        </b-card-text>
      </b-card>
    </b-col>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      param: {
        motivationSelected: this.$route.params.motivationId,
        conditionSelected: this.$route.params.conditionId,
        performanceSelected: this.$route.params.performanceId,
        comment: this.$route.params.comment,
      },
      radioItems: [
        {
          icon: ["fas", "sun"],
          style: { color: "#ea5550" },
          value: 1,
        },
        {
          icon: ["fas", "cloud-sun"],
          style: { color: "#f3981d" },
          value: 2,
        },
        {
          icon: ["fas", "cloud"],
          style: { color: "#b2cbe4" },
          value: 3,
        },
        {
          icon: ["fas", "cloud-rain"],
          style: { color: "#68a4d9" },
          value: 4,
        },
        {
          icon: ["fas", "cloud-showers-heavy"],
          style: { color: "#0075c2" },
          value: 5,
        },
      ],
    };
  },
  methods: {
    register() {
      axios
        .post("/editDailyPost/edit", {
          version: this.$route.params.version,
          updateUserId: this.$store.state.loginUser.userId,
          motivationId: this.param.motivationSelected,
          conditionId: this.param.conditionSelected,
          performanceId: this.param.performanceSelected,
          comment: this.param.comment,
          dailyPostId: this.$route.params.dailyPostId,
        })
        .then((response) => {
          if (response.data[0].version === 0) {
            alert(
              "他のユーザーが先に変更処理を行いました。\n更新ボタンを押して画面を再読み込みし、最新の状態を確認してください。"
            );
            this.$router.push("/");
          } else {
            console.log(response.data);
            this.$store.dispatch("setDairyPost", response.data);
            this.$store.dispatch("setMyDailyPost", response.data);
          }
        })
        .catch((e) => {
          alert("コンディション編集の送信に失敗しました：" + e);
        });

      alert("投稿内容の変更に成功しました。");
      this.$router.push("/myCondition");
    },
  },
};
</script>
