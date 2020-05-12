<template>
  <b-col>
    <h2 class="mb-4">集計グラフ</h2>
    <b-row>
      <b-col sm="4" class="pb-0">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="selectedDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="selectedDate"
              label="表示する日付を選択してください"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectedDate"
            locale="ja-ja"
            :day-format="(date) => new Date(date).getDate()"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(selectedDate)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-menu>
      </b-col>
    </b-row>
    {{ selectedDate }}
    <DailyAggregate :selected-date="selectedDate" />
    <GraphDescription />
    <MonthlyAggregate />
  </b-col>
</template>

<script>
import MonthlyAggregate from "@/components/aggregate/MonthlyAggregate";
import DailyAggregate from "@/components/aggregate/DailyAggregate.vue";
import GraphDescription from "@/components/aggregate/GraphDescription.vue";

export default {
  components: {
    DailyAggregate,
    MonthlyAggregate,
    GraphDescription,
  },
  data() {
    return {
      selectedDate: String,
      menu: false,
    };
  },
};
</script>
