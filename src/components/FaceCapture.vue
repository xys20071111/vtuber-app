<template>
  <video hidden ref="captureVideo"></video>
  面捕控制<br/>
  <el-button @click="startCapture">启动面捕</el-button>
  <el-button @click="stopCapture">停止面捕</el-button>
</template>

<script lang="ts">
import mitt from 'mitt'
import { PoseData } from '@/renderer'
import { ElButton } from 'element-plus'
import { TFace, TPose, Face, Pose, Hand, THand } from 'kalidokit'
import { defineComponent, onMounted, ref } from 'vue'
import { Camera } from '@mediapipe/camera_utils'
import { Holistic } from '@mediapipe/holistic'

export default defineComponent({
  components: {
    ElButton
  },
  setup () {
    const events = mitt()
    const captureVideo = ref()
    const holistic = new Holistic({
      locateFile: (file) => {
        return `/static/${file}`
      }
    })
    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
      refineFaceLandmarks: true
    })

    holistic.onResults((result) => {
      const poseResult: PoseData = {}
      if (result.faceLandmarks) {
        poseResult.face = Face.solve(result.faceLandmarks, {
          smoothBlink: true
        }) as TFace
      }
      if (result.ea && result.poseLandmarks) {
        poseResult.pose = Pose.solve(result.ea, result.poseLandmarks) as TPose
      }
      if (result.leftHandLandmarks && poseResult.pose) {
        poseResult.handL = Hand.solve(
          result.leftHandLandmarks,
          'Left'
        ) as THand<'Left'>
      }
      if (result.rightHandLandmarks && poseResult.pose) {
        poseResult.handR = Hand.solve(
          result.rightHandLandmarks,
          'Right'
        ) as THand<'Right'>
      }

      window.control.sendLandmarks(poseResult)
    })
    onMounted(() => {
      const camera = new Camera(captureVideo.value, {
        onFrame: async () => {
          await holistic.send({ image: captureVideo.value })
        },
        width: 640,
        height: 480
      })
      events.on('start', () => { camera.start() })
      events.on('stop', () => { camera.stop() })
    })

    const startCapture = () => { events.emit('start') }
    const stopCapture = () => { events.emit('stop') }
    return { captureVideo, startCapture, stopCapture }
  }
})
</script>
