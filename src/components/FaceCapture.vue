<template>
  <video hidden id="captureVideo"></video>
</template>

<script lang="ts">
import { PoseData } from '@/renderer'
import { TFace, TPose, Face, Pose, Vector, Utils, Hand, THand } from 'kalidokit'
import { defineComponent, onMounted } from 'vue'
import { Camera } from '@mediapipe/camera_utils'
import { Holistic } from '@mediapipe/holistic'

export default defineComponent({
  setup () {
    const holistic = new Holistic({
      locateFile: (file) => { return `/static/${file}` }
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
        poseResult.face = Face.solve(result.faceLandmarks, { smoothBlink: true }) as TFace
      }
      if (result.ea && result.poseLandmarks) {
        poseResult.pose = Pose.solve(result.ea, result.poseLandmarks) as TPose
      }
      if (result.leftHandLandmarks && poseResult.pose) {
        poseResult.handL = Hand.solve(result.leftHandLandmarks, 'Left') as THand<'Left'>
      }
      if (result.rightHandLandmarks && poseResult.pose) {
        poseResult.handR = Hand.solve(result.rightHandLandmarks, 'Right') as THand<'Right'>
      }

      window.control.sendLandmarks(poseResult)
    })

    onMounted(() => {
      const video = document.getElementById('captureVideo') as HTMLVideoElement

      const camera = new Camera(video, {
        onFrame: async () => { await holistic.send({ image: video }) },
        width: 640,
        height: 480
      })
      camera.start()
    })
  }
})
</script>
