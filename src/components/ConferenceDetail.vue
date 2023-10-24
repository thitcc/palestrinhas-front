<template>
  <div class="conference-container">
    <h2 class="conference-title">{{ conference.title }}</h2>
    <p class="conference-dates">{{ formatDate(conference.start_date) }} - {{ formatDate(conference.end_date) }}</p>
    <div v-if="conference.schedule" class="schedule-container">
      <div v-for="track in conference.schedule.lectures" :key="track[0]?.track?.identifier">
        <h3>Track {{ track[0]?.track?.identifier }}:</h3>
        <p v-for="lecture in track" :key="lecture.title">
          {{ formatTime(lecture.starting_time) }} {{ lecture.title }} {{ lecture.duration }}min
        </p>
      </div>
      <p>{{ formatTime(conference.schedule.networking_event_start) }} Evento de Networking</p>
    </div>
    <div v-else>
      <p class="no-info">Informações sobre as palestras não estão disponíveis no momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useRoute} from 'vue-router';
import axios from '@/axiosConfig';

const conference = ref({});

const route = useRoute();

const fetchData = async () => {
  try {
    const confRes = await axios.get(`/conferences/${route.params.id}`);

    conference.value = confRes.data;
  } catch (error) {
    console.error('Ocorreu um erro ao buscar os detalhes da conferência:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
};

const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

onMounted(fetchData);
</script>

<style>
.conference-container {
  text-align: center;
  padding: 20px;
  border-radius: 10px;
}

.schedule-container {
  text-align: left;
  margin: auto;
  width: 80%;
}

.conference-title {
  font-size: 24px;
  color: #333;
}

.conference-dates {
  font-size: 18px;
  color: #555;
}

.no-info {
  color: red;
  font-weight: bold;
}
</style>