<template>
  <div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "名前",
          sortable: true,
        },
        {
          key: "dep",
          label: "部署名",
          sortable: true,
        },
        {
          key: "hireDate",
          label: "入社月",
          sortable: true,
        },
        {
          key: "motivation",
          label: "やる気",
          sortable: true,
        },
        {
          key: "condition",
          label: "体調",
          sortable: true,
        },
        {
          key: "performance",
          label: "成果",
          sortable: true,
        },
        {
          key: "comment",
          label: "コメント",
          sortable: true,
        },
      ],
      items: [
        {
          name: "東 俊介",
          dep: "アプリエンジニア",
          hireDate: "2019/10",
          motivation: "☼",
          condition: "☂",
          performance: "☼",
          comment: "ラーメン食べたい。",
        },
        {
          name: "飯田周平",
          dep: "アプリエンジニア",
          hireDate: "2019/10",
          motivation: "☂",
          condition: "☂",
          performance: "☂",
          comment: "今日はつらいです・・・。",
        },
        {
          name: "森塚太郎",
          dep: "クラウドエンジニア",
          hireDate: "2019/10",
          motivation: "☼",
          condition: "☼",
          performance: "☼",
          comment: "絶好調！！！！！",
        },
      ],
    };
  },
};
</script>
