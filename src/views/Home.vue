<template>
  <div class="home">
    <open-file :onUpload="uploadModel" />
    <open-file desrc="打开图片"
      accept="image/*"
      :onUpload="uploadImage"
    />
    <label for="change-color">调整背景颜色</label>
    <change-color id="change-color"/>
    <face-capture />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FaceCapture from '@/components/FaceCapture.vue'
import OpenFile from '@/components/OpenFile.vue'
import ChangeColor from '@/components/ChangeColor.vue'

export default defineComponent({
  name: 'Home',
  components: {
    OpenFile,
    ChangeColor,
    FaceCapture
  },
  setup () {
    const uploadModel = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        window.control.setNewModel((reader.result as string).replace('data:application/octet-stream;', 'data:model/vrm;'))
      })

      if (file) {
        reader.readAsDataURL(file)
      }
    }

    const uploadImage = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        window.control.setNewBackground({
          type: 'img',
          data: reader.result as string
        })
      })

      if (file) {
        reader.readAsDataURL(file)
      }
    }

    return { uploadModel, uploadImage }
  }
})
</script>
