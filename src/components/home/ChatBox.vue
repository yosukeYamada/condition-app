<template>
  <v-container>
    <div class="rakuscal">
      <v-img 
        :src="rakuscalImage"
        class="img"
      />

      <div class="description" v-if="!toggle">
        僕に何か用かな？
        <ul>
          <li @click="openTalk" id="talk">ラクスカル君とおしゃべりしたい！</li>
          <li @click="openLastWeek" id="lastWeek">私の先週の働きっぷりを総評して欲しい！</li>
          <li @click="openLastMonth" id="lastMonth">私の先月の働きっぷりを総評して欲しい！</li>
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
      <span>こんにちは</span>
    </div>

    <div v-if="lastMonth" class="my-parts">
      <span>こんばんは</span>
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
      <input
        type="text"
        v-model="message"
      />
      <button @click="sendMessage">送信</button>
    </div>
  </section>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ChatBox',
  data: () => ({
    message: '',
    messages: [],
    toggle:false,
    talk:false,
    lastWeek: false,
    lastMonth:false,
    rakuscalImage: "/rakuscal_clear.png",
  }),
  methods: {
    sendMessage() {
      const message = this.message
      this.messages.push({
        text: message,
        author: 'client'
      })
      this.message = ''
      let params = new URLSearchParams();
      params.append('apikey', 'DZZFZglGN7QoV2cbRMvNJ5Zuj4VqzJJA');
      params.append('query',message);
      axios.post('https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk', params)
      .then(res => {
        this.messages.push({
          text: res.data.results[0].reply,
          author: 'server'
        })
        this.$nextTick(() => {
          this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
        })
      })
    },
    openTalk() {
      this.toggle = !this.toggle
      this.talk = !this.talk
    },
    closeTalk() {
      this.toggle = !this.toggle
      this.talk = !this.talk
    },
    openLastWeek() {
      this.toggle = !this.toggle
      this.lastWeek = !this.lastWeek
    },
    closeLastWeek() {
      this.toggle = !this.toggle
      this.lastWeek = !this.lastWeek
    },
    openLastMonth() {
      this.toggle = !this.toggle
      this.lastMonth = !this.lastMonth
    },
    closeLastMonth() {
      this.toggle = !this.toggle
      this.lastMonth = !this.lastMonth
    },
  }
}
</script>

<style scoped lang="scss">
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
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
      background: #0070C8;
    }
    p {
      float: right;
    }
  }
}
.chat-box {
  border: 1px solid #999;
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
    border: 1px solid #999;
    border-left: none;
    border-bottom: none;
    border-right: none;
    border-bottom-left-radius: 4px;
    padding-left: 15px;
  }
  button {
    width: 145px;
    color: white;
    background: #0070C8;
    border-color: #999;
    border-bottom: none;
    border-right:none;
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
.rakuscal{
    position: relative;
    cursor: pointer;
    display: inline-block;
}
.rakuscal p{
    margin:0;
    padding:0;
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
.rakuscal:hover .description{
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
	padding: .8em;
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
</style>