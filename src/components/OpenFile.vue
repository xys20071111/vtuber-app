<template>
  <div class="set-model">
    {{text}}
    <input type="file" ref="upload" :accept="acceptType">
    <el-button @click="uploadFile">打开</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Home',
  components: {
    ElButton
  },
  props: {
    accept: {
      required: true,
      type: String,
      default: '.vrm'
    },
    desrc: {
      required: true,
      type: String,
      default: '打开模型'
    },
    onUpload: {
      required: true,
      type: Function
    }
  },
  setup (props) {
    const { accept, desrc, onUpload } = toRefs(props)
    const upload = ref()
    const uploadFunction = () => {
      onUpload.value(upload.value.files[0])
    }
    return { uploadFile: uploadFunction, upload, acceptType: accept, text: desrc }
  }
})
</script>
