<template>
<div>

    <el-select v-model="value" placeholder="部署名">
    <el-option
      v-for="depName in depNames"
      :key="depName.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <el-select v-model="value1" multiple placeholder="部署名">
    <el-option
      v-for="depName in depNames"
      :key="depName.value"
      :label="depName.label"
      :value="depName.value"
      v-model="filterDepName"
      @change="changeDepName()"
      >
    </el-option>
  </el-select>
  
  <el-select
    v-model="value2"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value1: [],
        value2: []
      }
    }
  }
</script>