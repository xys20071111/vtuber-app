<template>
  <el-container>
    <el-header>Vtuber</el-header>
    <el-aside>这里应该是侧栏</el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus'

export default {
  name: 'App',
  components: {
    ElContainer,
    ElHeader,
    ElAside,
    ElMain
  }
}
</script>
