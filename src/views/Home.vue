<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="test">测试</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Home',
  components: {
    ElButton
  },
  setup () {
    const test = () => {
      window.control.reloadModel()
    }

    return { test }
  }
})
</script>
