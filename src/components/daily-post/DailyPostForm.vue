<template>
  <b-col lg="8">
    <b-card
      class="text-left"
      border-variant="success"
      style="border-width:2px;"
      header="今日のコンディション登録"
      header-bg-variant="success"
      header-text-variant="white"
    >
      <b-card-text class="pt-2">
        <b-form>
          <b-form-group
            class="pt-4"
            label="今日のモチベーションはどれくらいですか？"
          >
            <b-form-radio-group
              class="text-center"
              v-model="param.motivationSelected"
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
          <b-form-group class="pt-4" label="今日の体調はどうですか？">
            <b-form-radio-group
              class="text-center"
              v-model="param.conditionSelected"
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
            class="pt-4"
            label="今日やることの目標のイメージはできていますか？"
          >
            <b-form-radio-group
              class="text-center"
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
            <div v-if="error" id="comment">200字以内でコメントしてください</div>
            <b-form-textarea
              class="mt-3"
              id="input-comment"
              v-model="param.comment"
              placeholder="コメントがあれば入力してください"
              rows="3"
              max-rows="6"
              @keyup="keyUp"
            ></b-form-textarea>
          </b-form-group>
          <b-button
            v-bind:disabled="isPush"
            variant="outline-success"
            @click.prevent="register()"
            >登録する</b-button
          >
        </b-form>
      </b-card-text>
    </b-card>
  </b-col>
</template>
<script>
import axios from "axios";
import AUTHORITY from "@/assets/js/Authority.js";


export default {
    
  data() {
    return {
      loading: false,
      isPush: false,
      error: false,
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
      Promise.resolve()
        .then(() =>
          axios
            .post("/registerDailyPost", {
              userId: this.$store.state.loginUser.userId,
              motivationId: this.param.motivationSelected,
              conditionId: this.param.conditionSelected,
              performanceId: this.param.performanceSelected,
              comment: this.param.comment,
            })
            .then((response) => {
              if (this.$store.state.loginUser.authority === AUTHORITY.ADMIN) {
                this.$store.dispatch("setMyDailyPost", response.data);
              }
              alert("登録しました！");
            })
            .catch((e) => {
              alert("コンディション登録の送信に失敗しました：" + e);
            })
        )
        .then(() => this.$router.push("/myCondition"));
    },
    keyUp() {
      if (this.param.comment.length > 200) {
        this.error = true;
        this.isPush = true;
      } else if (this.param.comment.length <= 200) {
        this.error = false;
        this.isPush = false;
      }
    },
  },
};
</script>
<style>
#comment {
  color: red;
}
</style>
