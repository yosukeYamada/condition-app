<template>
  <v-container id="depName">
    <v-row align="left">
      <v-col class="d-flex" cols="14" sm="6">
        <v-select
          :items="hireDate"
          label="部署名"
          v-model="filterDepName"
          @change="handleChangeQuery()"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>