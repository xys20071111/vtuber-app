<template>
  <div>
    <el-color-picker v-model="colorString" @change="upload"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElColorPicker } from 'element-plus'

export default defineComponent({
  components: {
    ElColorPicker
  },
  setup () {
    const colorString = ref()
    const upload = () => {
      window.control.setNewBackground({ type: 'color', data: colorString.value })
    }

    return { colorString, upload }
  }
})
</script>
