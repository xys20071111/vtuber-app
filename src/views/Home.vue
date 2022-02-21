<template>
  <div class="home">
    <open-file :onUpload="uploadModel" />
    <open-file desrc="打开图片" accept="image/*" :onUpload="uploadImage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OpenFile from '@/components/OpenFile.vue'

export default defineComponent({
  name: 'Home',
  components: {
    OpenFile
  },
  setup () {
    const uploadModel = (file: File) => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        window.control.setNewModel(reader.result as string)
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
