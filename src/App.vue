<template>
  <el-container>
    <el-header></el-header>
    <el-aside></el-aside>
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
