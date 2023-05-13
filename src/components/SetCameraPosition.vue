<template>
  <el-card header="位置">
    <el-button @click="reset">重置</el-button><br />
    X&nbsp;<el-slider :min=-5 :max=5 :step=0.01 v-model="x" @input="onXChanged" :debounce=1 show-input /><br />
    Y&nbsp;<el-slider :min=-5 :max=5 :step=0.01 v-model="y" @input="onYChanged" :debounce=1 show-input /><br />
    Z&nbsp;<el-slider :min=-5 :max=5 :step=0.01 v-model="z" @input="onZChanged" :debounce=1 show-input /><br />
  </el-card>
</template>

<script lang="ts">
import { ElButton, ElSlider, ElCard } from 'element-plus'
import { ref, defineComponent } from 'vue'

export default defineComponent({
  components: {
    ElButton,
    ElSlider,
    ElCard
  },
  setup () {
    const latestPos = JSON.parse(localStorage.getItem('cam-pos') || JSON.stringify({ x: 0, y: 1.4, z: 0.7 }))
    const x = ref(latestPos.x)
    const y = ref(latestPos.y)
    const z = ref(latestPos.z)
    const onXChanged = (val: number) => {
      window.control.setCamPosition({ x: val })
      localStorage.setItem('cam-pos', JSON.stringify({
        x: x.value,
        y: y.value,
        z: z.value
      }))
    }
    const onYChanged = (val: number) => {
      window.control.setCamPosition({ y: val })
      localStorage.setItem('cam-pos', JSON.stringify({
        x: x.value,
        y: y.value,
        z: z.value
      }))
    }
    const onZChanged = (val: number) => {
      window.control.setCamPosition({ z: val })
      localStorage.setItem('cam-pos', JSON.stringify({
        x: x.value,
        y: y.value,
        z: z.value
      }))
    }
    const reset = () => {
      x.value = 0
      y.value = 1.4
      z.value = 0.7
      window.control.setCamPosition({ x: 0, y: 1.4, z: 0.7 })
      localStorage.setItem('cam-pos', JSON.stringify({
        x: x.value,
        y: y.value,
        z: z.value
      }))
    }
    return { x, y, z, onXChanged, onYChanged, onZChanged, reset }
  }
})

</script>
