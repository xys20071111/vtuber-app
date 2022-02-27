<template>
  <el-container>
    <el-header>
      <face-capture />
    </el-header>
    <el-aside>这里应该是侧栏</el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'
import FaceCapture from './components/FaceCapture.vue'

export default {
  name: 'App',
  components: {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    FaceCapture
  }
}
</script>
