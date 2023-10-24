<template>
  <div class="form-container">
    <h2>Adicionar Nova Conferência</h2>
    <form @submit.prevent="addConference" class="form">
      <div>
        <label for="title">Título:</label>
        <input type="text" id="title" v-model="title" required class="input-field" />
      </div>
      <div class="date-container">
        <label for="start-date">Data de Início:</label>
        <input type="date" id="start-date" v-model="startDate" required class="date-field" />
      </div>
      <div class="date-container">
        <label for="end-date">Data de Fim:</label>
        <input type="date" id="end-date" v-model="endDate" required class="date-field" />
      </div>
      <button type="submit" class="submit-btn">Adicionar Conferência</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axiosConfig';

const title = ref('');
const startDate = ref('');
const endDate = ref('');

const addConference = async () => {
  try {
    const payload = {
      title: title.value,
      start_date: startDate.value,
      end_date: endDate.value
    };

    const response = await axios.post('/conferences', payload);
    if (response.status === 201 || response.status === 200) {
      alert('Conferência adicionada com sucesso!');
      title.value = '';
      startDate.value = '';
      endDate.value = '';
    }
    window.location.reload()
  } catch (error) {
    alert('Ocorreu um erro ao adicionar a conferência');
    console.error(error);
  }
};
</script>

<style>
.form-container {
  padding: 20px;
}

.form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-field,
.date-field {
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.date-container {
  position: relative;
}

.date-container::before {
  content: "\f073";
  font-family: FontAwesome;
  position: absolute;
  right: 10px;
  top: 35px;
  font-size: 20px;
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