<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="test">测试</el-button>
    <input type="file" ref="upload">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Home',
  components: {
    ElButton
  },
  setup () {
    const upload = ref()
    const test = () => {
      const file = upload.value.files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        window.control.setNewModel(reader.result as string)
      })

      if (file) {
        reader.readAsDataURL(file)
      }
    }

    return { test, upload }
  }
})
</script>
