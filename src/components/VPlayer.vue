<template>
  <div class="flex w-4/5 m-auto">
    <div class="mr-10 text-center">
      <div class="p-2">
        <h2 class="text-3xl">{{ activeV.title }}</h2>
        <h3 class="text-2xl">{{ activeV.subtitle }}</h3>
      </div>
      <video
        controls
        @timeupdate="handleTimeUpdate"
        width="640"
        height="360"
        :src="activeV.video_url"
        frameborder="0"
        allow="autoplay; encrypted-media"
        longdesc
        allowfullscreen
      ></video>
      <h3>{{ activeV.description }}</h3>
    </div>
    <div class="mt-20">
      <div
        class="flex w-60 p-1.5 shadow-xl"
        :key="video.id"
        v-for="video in store.videos"
      >
        <div class="w-60 cursor-pointer">
          <img :src="video.thumbnail" />
        </div>
        <div class="ml-2">
          <h3>{{ video.title }}</h3>
          <p>{{ video.subtitle }}</p>
        </div>
      </div>
      <el-button
        class="mt-8 h-12 w-36"
        @click="nextVideo"
        type="warning"
        plain
        :disabled="state.showButton"
        >NextVideo</el-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useCounterStore } from "../stores/counter";
import { h } from "vue";
import { ElNotification } from "element-plus";

const store = useCounterStore();
store.videos;
let currentTime = ref(0);
let duration = ref(0);
let activeV = store.videos[0];
let state = reactive({
  showButton: true,
});
let count = 0;

const handleTimeUpdate = (event) => {
  currentTime.value = Math.floor(event.target.currentTime);
  duration.value = Math.floor(event.target.duration);
  state.showButton = true;
  if (currentTime.value >= duration.value) {
    open1();
    state.showButton = false;
  }
};

const showPopap = () => {
  state.showButton = true;
  state.showButton = false;
};

const nextVideo = () => {
  const active = store.videos.map((el) => el);
  if (count <= 4) {
    showPopap();
    count++;
    activeV = active[count];
  }
  if (count > 3) {
    open2();
    state.showButton = true;
  }
};
const open1 = () => {
  ElNotification({
    title: "Вітаю",
    message: h(
      "i",
      { style: "color: teal" },
      "Можете перейти до наступного відео"
    ),
  });
};
const open2 = () => {
  ElNotification({
    title: "Нажаль",
    message: h("i", { style: "color: teal" }, "Всі відео закінчились("),
  });
};
</script>
<style scoped>
</style>