<template>
  <div>
    <h1>従業員一覧</h1>
    <div>初期表示は全従業員の一覧を当日のコンディション内容で表示</div>
    <br />

    <table>
      <tr>
        <th>名前</th>
        <th>部署名</th>
        <th>入社日</th>
        <th>体調</th>
        <th>やる気</th>
        <th>成果</th>
        <th>コメント</th>
      </tr>
      <tr>
        <router-link to="/MotivHistory">
          <td>東 俊介</td>
        </router-link>
        <td>アプリエンジニア</td>
        <td>2019/10</td>
        <td>☼</td>
        <td>☂</td>
        <td>☼</td>
        <td>ラーメン食べたい</td>
      </tr>
      <tr>
        <router-link to="/MotivHistory">
          <td>東 俊介</td>
        </router-link>
        <td>アプリエンジニア</td>
        <td>2019/10</td>
        <td>☼</td>
        <td>☂</td>
        <td>☼</td>
        <td>ラーメン食べたい</td>
      </tr>
      <tr>
        <router-link to="/MotivHistory">
          <td>東 俊介</td>
        </router-link>
        <td>アプリエンジニア</td>
        <td>2019/10</td>
        <td>☼</td>
        <td>☂</td>
        <td>☼</td>
        <td>ラーメン食べたい</td>
      </tr>
    </table>
  </div>
</template>
