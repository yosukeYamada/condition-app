<template>
  <b-col>
    <h2 class="mb-4">管理者設定</h2>
    <b-row>
      <b-col sm="6">
        <AdminSetting />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6">
        <Setting2 />
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import AdminSetting from "@/components/admin-setting/AdminSetting";
import Setting2 from "@/components/admin-setting/Setting2";

export default {
  components: {
    AdminSetting,
    Setting2
  },
};
</script>
