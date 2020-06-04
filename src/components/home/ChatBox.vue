<template>
  <div class="bot-content">
    <b-row>
      <b-col sm="6" md="5" lg="6" xl="5">
        <div class="rakuscal">
          <v-img :src="rakuscalImage" class="img m-2" />
          <div
            class="description text-white bg-success font-weight-bold body-2 p-3"
            v-if="!toggle"
          >
            僕に何か用かな？
            <ul class="mt-1 mb-0">
              <li @click="openTalk" id="talk">
                ラクスカル君とおしゃべりしたい！
              </li>
              <li @click="openLastWeek" id="lastWeek">
                私の先週の働きっぷりを総評して欲しい！
              </li>
              <li @click="openLastMonth" id="lastMonth">
                私の先月の働きっぷりを総評して欲しい！
              </li>
            </ul>
          </div>

          <div class="finish" v-if="talk" @click="closeTalk">
            <span class="finishTalk">終了するならクリック！</span>
          </div>

          <div class="finish" v-if="lastWeek" @click="closeLastWeek">
            <span class="finishTalk">終了するならクリック！</span>
          </div>

          <div class="finish" v-if="lastMonth" @click="closeLastMonth">
            <span class="finishTalk">終了するならクリック！</span>
          </div>
        </div>
      </b-col>

      <b-col sm="6" md="7" lg="6" xl="7" v-if="lastWeek">
        <div class="my-parts p-4" style="border-radius:4px;">
          <h3 class="headline font-weight-bold mb-5">
            先週の総合結果：{{ lastWeekScore }}/{{ totalMaxScoreOfLastWeek }}点
          </h3>
          <h5>
            モチベーション：{{ lastWeekMotivationScore }}/{{
              partMaxScoreOfLastWeek
            }}点
          </h5>
          <h5>
            コンディション：{{ lastWeekConditionScore }}/{{
              partMaxScoreOfLastWeek
            }}点
          </h5>
          <h5>
            パフォーマンス：{{ lastWeekPerformanceScore }}/{{
              partMaxScoreOfLastWeek
            }}点
          </h5>
          <div v-if="lastWeekScore === 0">
            <br />
            <span
              >今日から毎日コンディション登録をして頑張っていきましょう！</span
            >
          </div>
          <div
            v-if="
              lastWeekScore > 0 &&
                lastWeekScore <= 5 * totalOrderCountOfLastWeek
            "
          >
            <br />
            <span>
              大丈夫ですか！？ラクスカルは不安でなりません！
              改めて先週の自分の行動を振り返りましょう！
            </span>
          </div>
          <div
            v-if="
              lastWeekScore > 5 * totalOrderCountOfLastWeek &&
                lastWeekScore <= 7 * totalOrderCountOfLastWeek
            "
          >
            <br />
            <span>
              今週は少し頑張りが足りなかったようです、、
              来週はコンデイションを整えて良い１週間にしましょう！
            </span>
          </div>

          <div
            v-if="
              lastWeekScore > 7 * totalOrderCountOfLastWeek &&
                lastWeekScore <= 11 * totalOrderCountOfLastWeek
            "
          >
            <br />
            <span
              >コンディションは概ね良好のようですね！疲れている時には糖分を取って休憩しましょう！</span
            >
          </div>
          <div
            v-if="
              lastWeekScore > 11 * totalOrderCountOfLastWeek &&
                lastWeekScore <= 13 * totalOrderCountOfLastWeek
            "
          >
            <br />
            <span
              >素晴らしい！コンディションも好調で、よくがんばりましたね！来週もこの調子でいきましょう！</span
            >
          </div>
        </div>
      </b-col>

      <b-col sm="6" md="7" lg="6" xl="7" v-if="lastMonth">
        <div class="my-parts p-4" style="border-radius:4px;">
          <h3 class="headline font-weight-bold mb-5">
            先月の総合結果：{{ lastMonthScore }}/{{
              totalMaxScoreOfLastMonth
            }}点
          </h3>
          <h5>
            モチベーション：{{ lastMonthMotivationScore }}/{{
              partMaxScoreOfLastMonth
            }}点
          </h5>
          <h5>
            コンディション：{{ lastMonthConditionScore }}/{{
              partMaxScoreOfLastMonth
            }}点
          </h5>
          <h5>
            パフォーマンス：{{ lastMonthPerformanceScore }}/{{
              partMaxScoreOfLastMonth
            }}点
          </h5>
          <div v-if="lastMonthScore === 0">
            <br />
            <span
              >今日から毎日コンディション登録をして頑張っていきましょう！</span
            >
          </div>
          <div
            v-if="
              lastMonthScore > 0 &&
                lastMonthScore <= 5 * totalOrderCountOfLastMonth
            "
          >
            <br />
            <span>
              かなり調子がよくなかったみたいです、、、
              原因をしっかり分析して改善につなげていきましょう！
            </span>
          </div>
          <div
            v-if="
              lastMonthScore > 5 * totalOrderCountOfLastMonth &&
                lastMonthScore <= 9 * totalOrderCountOfLastMonth
            "
          >
            <br />
            <span>
              ちょっと先月は調子が良くなかったみたいですね、、
              時には好きな事に没頭して気分転換をすることも大事ですよ！
            </span>
          </div>
          <div
            v-if="
              lastMonthScore > 9 * totalOrderCountOfLastMonth &&
                lastMonthScore <= 13 * totalOrderCountOfLastMonth
            "
          >
            <br />
            <span
              >概ねコンディションは良好なようですね！今月はもっと成果をだせるようにがんばっていきましょう！</span
            >
          </div>
          <div v-if="lastMonthScore > 13 * totalOrderCountOfLastMonth">
            <br />
            <span
              >お見事です！よく１ヶ月間コンディションを高く維持できましたね！ラクスカルも嬉しいです！</span
            >
          </div>
        </div>
      </b-col>

      <b-col sm="6" md="7" lg="6" xl="7" v-if="talk">
        <ValidationObserver v-slot="{ invalid, passes }">
          <ValidationProvider rules="required">
            <section class="chat-box">
              <div class="chat-box-list-container" ref="chatbox">
                <ul class="chat-box-list">
                  <li
                    class="message"
                    v-for="(message, idx) in messages"
                    :key="idx"
                    :class="message.author"
                  >
                    <p>
                      <span>{{ message.text }}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </section>
            <div class="chat-inputs">
              <b-form-input
                type="text"
                v-model="message"
                @keyup.enter="passes(sendMessage)"
                required
              />
              <b-button
                variant="outline-success"
                :disabled="invalid"
                @click.prevent="passes(sendMessage)"
              >
                <v-fa :icon="['fas', 'paper-plane']"></v-fa>
              </b-button>
            </div>
          </ValidationProvider>
        </ValidationObserver>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ChatBox",
  data: () => ({
    totalOrderCountOfLastWeek: "",
    totalMaxScoreOfLastWeek: "",
    partMaxScoreOfLastWeek: "",
    lastWeekMotivationScore: "",
    lastWeekConditionScore: "",
    lastWeekPerformanceScore: "",
    lastWeekScore: "",

    totalOrderCountOfLastMonth: "",
    totalMaxScoreOfLastMonth: "",
    partMaxScoreOfLastMonth: "",
    lastMonthMotivationScore: "",
    lastMonthConditionScore: "",
    lastMonthPerformanceScore: "",
    lastMonthScore: "",

    message: "",
    messages: [],
    toggle: false,
    talk: false,
    lastWeek: false,
    lastMonth: false,
    rakuscalImage: "/rakuscal_clear.png",
  }),
  methods: {
    sendMessage() {
      "use strict";
      const message = this.message;
      this.messages.push({
        text: message,
        author: "client",
      });
      this.message = "";
      let params = new URLSearchParams();
      params.append("apikey", "DZZFZglGN7QoV2cbRMvNJ5Zuj4VqzJJA");
      params.append("query", message);
      fetch("https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk", {
        method: "post",
        body: params,
      }).then((res) => {
        res.json().then((data) => {
          this.messages.push({
            text: data.results[0].reply,
            author: "server",
          });
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
          });
        });
      });
    },
    openTalk() {
      this.toggle = !this.toggle;
      this.talk = !this.talk;
      this.error = true;
    },
    closeTalk() {
      this.toggle = !this.toggle;
      this.talk = !this.talk;
      this.error = false;
    },
    openLastWeek() {
      this.toggle = !this.toggle;
      this.lastWeek = !this.lastWeek;
    },
    closeLastWeek() {
      this.toggle = !this.toggle;
      this.lastWeek = !this.lastWeek;
    },
    openLastMonth() {
      this.toggle = !this.toggle;
      this.lastMonth = !this.lastMonth;
    },
    closeLastMonth() {
      this.toggle = !this.toggle;
      this.lastMonth = !this.lastMonth;
    },
  },
  computed: {
    token() {
      return this.$store.state.token;
    },
  },
  mounted() {
    // axios.get('/test/insert')
    Promise.resolve()
      .then(() => (axios.defaults.headers.common["Authorization"] = this.token))
      .then(() =>
        axios
          .post("/showScore", {
            userId: this.$store.state.loginUser.userId,
          })
          .then((res) => {
            this.totalOrderCountOfLastWeek = res.data.totalOrderCountOfLastWeek;
            this.totalMaxScoreOfLastWeek = res.data.maxTotalScoreOfLastWeek;
            this.partMaxScoreOfLastWeek = res.data.maxPartScoreOfLastWeek;
            this.lastWeekMotivationScore =
              res.data.totalLastWeekMotivationScore;
            this.lastWeekConditionScore = res.data.totalLastWeekConditionScore;
            this.lastWeekPerformanceScore =
              res.data.totalLastWeekPerformanceScore;
            this.lastWeekScore = res.data.totalLastWeekCount;

            this.totalOrderCountOfLastMonth =
              res.data.totalOrderCountOfLastMonth;
            this.totalMaxScoreOfLastMonth = res.data.maxTotalScoreOfLastMonth;
            this.partMaxScoreOfLastMonth = res.data.maxPartScoreOfLastMonth;
            this.lastMonthMotivationScore =
              res.data.totalLastMonthMotivationScore;
            this.lastMonthConditionScore =
              res.data.totalLastMonthConditionScore;
            this.lastMonthPerformanceScore =
              res.data.totalLastMonthPerformanceScore;
            this.lastMonthScore = res.data.totalLastMonthCount;
          })
      );
  },
};
</script>

<style scoped lang="scss">
.img {
  max-width: 200px;
  max-height: 200px;
}
div.my-parts h5 {
  font-size:18px;
  margin-bottom:1rem;
}
.img:hover {
  cursor: pointer;
}
.rakuscal {
  cursor: pointer;
}

#talk:hover {
  font-size: 15px;
}
#lastWeek:hover {
  font-size: 15px;
}
#lastMonth:hover {
  font-size: 15px;
}
@media (max-width: 400px) {
  .description {
    line-height: 1.6em;
    border-radius: 5px;
  }
  .finish {
    padding: 10px;
    font-size: 14px;
    line-height: 1.6em;
    color: #fff;
    border-radius: 5px;
    background: #4ca746;
    max-width: 200px;
    font-weight: bold;
  }
}
@media (min-width: 401px) {
  .description {
    padding: 10px;
    font-size: 14px;
    line-height: 1.6em;
    border-radius: 5px;
  }
  .finish {
    position: absolute;
    padding: 10px;
    font-size: 14px;
    line-height: 1.6em;
    color: #fff;
    border-radius: 5px;
    background: #4ca746;
    max-width: 200px;
    font-weight: bold;
  }
  .finish:before {
    content: "";
    position: absolute;
    top: -24px;
    right: 60%;
    border: 15px solid transparent;
    border-top: 15px solid #4ca746;
    margin-left: -15px;
    transform: rotateZ(180deg);
  }
}
.finish:hover .finishTalk {
  font-size: 15px;
}
.my-parts {
  background: white;
  border: 2px solid #4ca746;
  position: relative;
  text-align: left;
}
.my-parts > :last-child {
  margin-bottom: 0;
}
.my-parts::before,
.my-parts::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
}
.my-parts::before {
  margin-top: -12.82px;
  border: 12.82px solid transparent;
  border-right: 12.82px solid #4ca746;
  z-index: 1;
}
.my-parts::after {
  margin-top: -10px;
  border: 10px solid transparent;
  border-right: 10px solid #4ca746;
  z-index: 2;
}

/** チャット系 */
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  background: #7494c0;
}
.chat-box-list-container {
  height: 250px;
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
  margin-bottom: 1px;
  margin-top: 5px;
}
.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;
  span {
    padding: 5px;
    color: black;
    border-radius: 10px;
  }
  .server {
    span {
      background: white;
    }
    p {
      float: left;
    }
  }
  .client {
    span {
      height: 20px;
      background: #99cc00;
    }
    p {
      float: right;
    }
    margin-top: 4px;
  }
}
.chat-box {
  border: 2px solid #808080;
  border-radius: 4px;
  justify-content: space-between;
}
.chat-inputs {
  display: flex;
  margin-top: 10px;

  input {
    line-height: 2;
    width: 100%;
    border: 2px solid #808080;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
    background: white;
  }
  button {
    border: solid;
    margin-left: 10px;
  }
}
</style>
