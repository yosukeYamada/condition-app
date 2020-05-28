<template>
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
    <div class="chat-inputs">
      <input
        type="text"
        v-model="message"
      />
      <button @click="sendMessage">送信</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: 'ChatBox',
  data: () => ({
    message: '',
    messages: []
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
          text: "ラクスカル : "+res.data.results[0].reply,
          author: 'server'
        })
        this.$nextTick(() => {
          this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.chat-box {
  background: white;
}
.chat-box,
.chat-box-list {
  display: flex;
  flex-direction: column;
  list-style-type: none;
}
.chat-box-list-container {
  overflow: scroll;
  margin-bottom: 1px;
}
.chat-box-list {
  padding-left: 10px;
  padding-right: 10px;
  span {
    padding: 8px;
    color: white;
    border-radius: 4px;
  }
  .server {
    span {
      background: #99cc00;
    }
    p {
      float: right;
    }
  }
  .client {
    span {
      background: #0070C8;
    }
    p {
      float: left;
    }
  }
}
.chat-box {
  margin: 10px;
  border: 1px solid #999;
  width: 30vw;
  height: 50vh;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  align-items: space-between;
  justify-content: space-between;
}
.chat-inputs {
  display: flex;
  
  input {
    line-height: 3;
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
</style>