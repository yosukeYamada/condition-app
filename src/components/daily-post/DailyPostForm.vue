<template>
  <b-col>
    <b-card
      class="text-left"
      border-variant="success"
      header="今日のコンディション登録"
      header-bg-variant="success"
      header-text-variant="white"
      style="border-width:2px;"
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
            <b-form-radio-group
              v-model="param.performanceSelected"
            >
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
            >登録する</b-button
          >
        </b-form>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      param: {
        motivationSelected: "3",
        performanceSelected: "3",
        conditionSelected: "3",
        comment: "",
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
        .post("http://localhost:8080/registerDailyPost", {
          userId: "4", // TODO とりあえず開発用で固定(ログイン時にDBからストアにユーザー情報を格納してそこから持ってくる)
          motivationId: this.param.motivationSelected,
          conditionId: this.param.conditionSelected,
          performanceId: this.param.performanceSelected,
          comment: this.param.comment,
        })
        .then((response) => {
          console.log("コンディション情報の登録に成功しました：" + response);
        })
        .catch((e) => {
          alert("コンディション登録の送信に失敗しました：" + e);
        });
      alert("登録しました！");
    },
  },
};
</script>
