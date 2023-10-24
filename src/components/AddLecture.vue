<template>
  <div class="form-container">
    <h2>Adicionar Nova Palestra</h2>
    <form @submit.prevent="addLecture" class="form">
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="duration">Duração:</label>
        <input type="number" id="duration" min="5" v-model="duration" required />
      </div>
      <button type="submit" class="submit-btn">Adicionar Palestra</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axiosConfig';

const title = ref('');
const duration = ref('');

const addLecture = async () => {
  try {
    const payload = {
      title: title.value,
      duration: duration.value,
    };

    const response = await axios.post('/lectures', payload);
    if (response.status === 201 || response.status === 200) {
      alert('Palestra adicionada com sucesso!');
      title.value = '';
      duration.value = '';
    }
    window.location.reload()
  } catch (error) {
    alert('Ocorreu um erro ao adicionar a palestra');
    console.error(error);
  }
};
</script>

<style>
.form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form div {
  margin-bottom: 15px;
}

.submit-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>