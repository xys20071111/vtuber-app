<template>
  <div class="set-model">
    {{ text }}
    <input hidden ref="upload" type="file" :accept="acceptType" />
    <el-button @click="uploadFile">打开</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from 'vue'
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

    const uploadFunction = ref()
    onMounted(() => {
      upload.value.addEventListener('change', () => {
        if (onUpload.value) { onUpload.value(upload.value.files[0]) }
      })
      uploadFunction.value = () => {
        upload.value.click()
      }
    })
    return {
      uploadFile: uploadFunction,
      upload,
      acceptType: accept,
      text: desrc
    }
  }
})
</script>
