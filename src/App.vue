<template>
  <el-container>
    <el-header>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { ElContainer, ElHeader, ElMain } from 'element-plus'

export default {
  name: 'App',
  components: {
    ElContainer,
    ElHeader,
    ElMain
  }
}
</script>
