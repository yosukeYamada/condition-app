<template>
  <div id="content">
    <h1>モチベ履歴</h1>
    <table>
      <tr>
        <th>日付</th>
        <th>体調</th>
        <th>やる気</th>
        <th>その他</th>
      </tr>
      <tr>
        <td>2020/4/24</td>
        <td>☼</td>
        <td>☼</td>
        <td>頑張る</td>
      </tr>
      <tr>
        <td>2020/4/23</td>
        <td>☂</td>
        <td>☼</td>
        <td>不調</td>
      </tr>
      <tr>
        <td>2020/4/22</td>
        <td>🌥</td>
        <td>🌥</td>
        <td>特になし</td>
      </tr>
      <tr>
        <td>2020/4/21</td>
        <td>☼</td>
        <td>☼</td>
        <td>元気</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getUserMotivations");
  }
};
</script>
