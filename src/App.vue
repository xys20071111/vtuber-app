<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <face-capture />
      <home />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { ElContainer, ElHeader, ElMain } from 'element-plus'
import Home from './views/Home.vue'
import FaceCapture from './components/FaceCapture.vue'

export default {
  name: 'App',
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    Home,
    FaceCapture
  }
}
</script>
