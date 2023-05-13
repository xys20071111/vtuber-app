<template>
  <div class="home">
    <el-card header="设置模型">
      <open-file :onUpload="uploadModel" />
    </el-card>
    <el-card header="场景设置">
      <el-card header="背景">
        <open-file desrc="打开图片" accept="image/*" :onUpload="uploadImage" />
        <span>调整背景颜色</span>
        <change-color id="change-color" />
      </el-card>
      <el-card header="摄像机">
        <set-camera-position />
      </el-card>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElCard } from 'element-plus'
import OpenFile from '@/components/OpenFile.vue'
import ChangeColor from '@/components/ChangeColor.vue'
import SetCameraPosition from '@/components/SetCameraPosition.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ElCard,
    OpenFile,
    ChangeColor,
    SetCameraPosition
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
