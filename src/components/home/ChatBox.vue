<template>
  <div class="bot-content">
    <v-container>
      <div class="rakuscal">
        <v-img :src="rakuscalImage" class="img" />

        <div class="description" v-if="!toggle">
          僕に何か用かな？
          <ul>
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

      <div v-if="lastWeek" class="my-parts">
          <span>先週の総合結果：{{lastWeekScore}}/{{ totalMaxScoreOfLastWeek}}点</span><br>
          <span>モチベーション：{{lastWeekMotivationScore}}/{{partMaxScoreOfLastWeek}}点</span><br>
          <span>コンディション：{{lastWeekConditionScore}}/{{partMaxScoreOfLastWeek}}点</span><br>
          <span>パフォーマンス：{{lastWeekPerformanceScore}}/{{partMaxScoreOfLastWeek}}点</span>

        <div v-if="lastWeekScore <= 15">
          <br><span
            >大丈夫ですか！？ラクスカルは不安でなりません！
            改めて先週の自分の行動を振り返りましょう！</span
          >
        </div>
        <div v-if="lastWeekScore > 15 && lastWeekScore <= 25">
          <br><span
            >今週は少し頑張りが足りなかったようです、、
            来週はコンデイションを整えて良い１週間にしましょう！</span
          >
        </div>
        <div v-if="lastWeekScore > 25 && lastWeekScore <= 45">
          <br><span
            >今週は少し頑張りが足りなかったようです、、
            来週はコンデイションを整えて良い１週間にしましょう！</span
          >
        </div>
        <div v-if="lastWeekScore > 45 && lastWeekScore <= 65">
          <br><span
            >コンディションは概ね良好のようですね！疲れている時には糖分を取って休憩しましょう！</span
          >
        </div>
        <div v-if="lastWeekScore > 65 && lastWeekScore <= 75">
         <br><span
            >コンディションは概ね良好のようですね！疲れている時には糖分を取って休憩しましょう！</span
          >
        </div>
      </div>

      <div v-if="lastMonth" class="my-parts">
        <span>先月の総合結果：{{lastMonthScore}}/{{totalMaxScoreOfLastMonth}}点</span><br>
          <span>モチベーション：{{lastMonthMotivationScore}}/{{partMaxScoreOfLastMonth}}点</span><br>
          <span>コンディション：{{lastMonthConditionScore}}/{{partMaxScoreOfLastMonth}}点</span><br>
          <span>パフォーマンス：{{lastMonthPerformanceScore}}/{{partMaxScoreOfLastMonth}}点</span>
        <div v-if="lastMonthScore <= 120">
          <br><span
            >かなり調子がよくなかったみたいです、、、
            原因をしっかり分析して改善につなげていきましょう！</span
          >
        </div>
        <div v-if="lastMonthScore > 120 && lastMonthScore <= 210">
          <br><span>
            ちょっと先月は調子が良くなかったみたいですね、、
            時には好きな事に没頭して気分転換をすることも大事ですよ！
          </span>
        </div>
        <div v-if="lastMonthScore > 210 && lastMonthScore <= 270">
          <br><span>
            概ねコンディションは良好なようですね！今月はもっと成果をだせるようにがんばっていきましょう！
          </span>
        </div>
        <div v-if="lastMonthScore > 270 ">
          <br><span>
            お見事です！よく１ヶ月間コンディションを高く維持できましたね！ラクスカルも嬉しいです！
          </span>
        </div>
      </div>

      <section class="chat-box" v-if="talk">
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
        <div class="chat-inputs">
          <input type="text" v-model="message" @keyup="keyUp" />
          <button v-bind:disabled="isPush" @click="sendMessage">送信</button>
        </div>
      </section>
    </v-container>
    <div class="parent">
      <div v-if="error" id="error">ラクスカルくんに話しかけてみよう！！</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ChatBox",
  data: () => ({
    totalMaxScoreOfLastWeek:"",
    partMaxScoreOfLastWeek:"",
    lastWeekMotivationScore:"",
    lastWeekConditionScore:"",
    lastWeekPerformanceScore:"",
    lastWeekScore: "",

    totalMaxScoreOfLastMonth:"",
    partMaxScoreOfLastMonth:"",
    lastMonthMotivationScore:"",
    lastMonthConditionScore:"",
    lastMonthPerformanceScore:"",
    lastMonthScore: "",

    isPush: true,
    error: false,
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
      const message = this.message;
      this.messages.push({
        text: message,
        author: "client",
      });
      this.message = "";
      let params = new URLSearchParams();
      params.append("apikey", "DZZFZglGN7QoV2cbRMvNJ5Zuj4VqzJJA");
      params.append("query", message);
      axios
        .post("https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk", params)
        .then((res) => {
          this.messages.push({
            text: res.data.results[0].reply,
            author: "server",
          });
          this.$nextTick(() => {
            this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
          });
        });
      this.isPush = true;
      this.error = true;
    },
    keyUp() {
      if (this.message.length === 0) {
        this.isPush = true;
        this.error = true;
      } else {
        this.isPush = false;
        this.error = false;
      }
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
  created() {
    axios
      .post("/showScore", {
        userId: this.$store.state.loginUser.userId,
      })
      .then((res) => {
        console.log(res.data);
         this.totalMaxScoreOfLastWeek = res.data.maxTotalScoreOfLastWeek;
         this.partMaxScoreOfLastWeek = res.data.maxPartScoreOfLastWeek;
         this.lastWeekMotivationScore = res.data.totalLastWeekMotivationScore;
         this.lastWeekConditionScore = res.data.totalLastWeekConditionScore;
         this.lastWeekPerformanceScore = res.data.totalLastWeekPerformanceScore;
        this.lastWeekScore = res.data.totalLastWeekCount;

        this.totalMaxScoreOfLastMonth = res.data.maxTotalScoreOfLastMonth;
        this.partMaxScoreOfLastMonth = res.data.maxPartScoreOfLastMonth;
        this.lastMonthMotivationScore = res.data.totalLastMonthMotivationScore;
        this.lastMonthConditionScore = res.data.totalLastMonthConditionScore;
        this.lastMonthPerformanceScore = res.data.totalLastMonthPerformanceScore;
        this.lastMonthScore = res.data.totalLastMonthCount;
      });
  },
};
</script>

<style scoped lang="scss">
.bot-content {
  margin-top: 50px;
}
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  background: #7494c0;
}
.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
  margin-top: 5px;
}
.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;
  span {
    padding: 5px;
    color: white;
    border-radius: 10px;
  }
  .server {
    span {
      background: #99cc00;
    }
    p {
      float: left;
    }
  }
  .client {
    span {
      height: 20px;
      background: #0070c8;
    }
    p {
      float: right;
    }
    margin-top: 4px;
  }
}
.chat-box {
  border: 2px solid #808080;
  width: 50vw;
  height: 40vh;
  border-radius: 4px;
  justify-content: space-between;
}
.chat-inputs {
  display: flex;

  input {
    line-height: 2;
    width: 100%;
    border: 2px solid #808080;
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
    background: white;
  }
  button {
    width: 145px;
    color: white;
    background: #0070c8;
    border-color: #999;
    border-bottom: none;
    border-right: none;
    border-bottom-right-radius: 3px;
  }
}
.img {
  width: 200px;
  height: 200px;
}
.img:hover {
  cursor: pointer;
}
.rakuscal {
  position: relative;
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  margin-top: 20px;
}
.rakuscal p {
  margin: 0;
  padding: 0;
}
.description {
  display: none;
  position: absolute;
  padding: 10px;
  font-size: 14px;
  line-height: 1.6em;
  color: #fff;
  border-radius: 5px;
  background: green;
  width: 330px;
  font-weight: bold;
}
.description:before {
  content: "";
  position: absolute;
  top: -24px;
  right: 60%;
  border: 15px solid transparent;
  border-top: 15px solid green;
  margin-left: -15px;
  transform: rotateZ(180deg);
}
.rakuscal:hover .description {
  display: inline-block;
  left: -50px;
}
.container {
  display: flex;
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
.finish {
  position: absolute;
  padding: 10px;
  font-size: 14px;
  line-height: 1.6em;
  color: #fff;
  border-radius: 5px;
  background: green;
  width: 200px;
  font-weight: bold;
}
.finish:before {
  content: "";
  position: absolute;
  top: -24px;
  right: 60%;
  border: 15px solid transparent;
  border-top: 15px solid green;
  margin-left: -15px;
  transform: rotateZ(180deg);
}
.finish:hover .finishTalk {
  font-size: 15px;
}
.my-parts {
  display: inline-block;
  width: 500px;
  max-width: 100%;
  background: white;
  border: 2px solid green;
  border-radius: 0px;
  padding: 0.8em;
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
  border-right: 12.82px solid green;
  z-index: 1;
}
.my-parts::after {
  margin-top: -10px;
  border: 10px solid transparent;
  border-right: 10px solid green;
  z-index: 2;
}

.parent {
  text-align: center;
  font-size: 20px;
  color: red;
}
</style>
