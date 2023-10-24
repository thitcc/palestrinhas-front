<template>
  <div>
    <h2>Lista de Conferências</h2>
    <table class="conferences-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Data de Início</th>
          <th>Data de Fim</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conference in conferences" :key="conference.id">
          <td><router-link :to='`/conference/${conference.id}`'>{{ conference.title }}</router-link></td>
          <td>{{ formatDate(conference.start_date) }}</td>
          <td>{{ formatDate(conference.end_date) }}</td>
          <td>
            <label class="file-upload-btn">
              Upload
              <input type="file" class="file-input" @input="handleLecturesInput($event, conference.id)" />
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axiosConfig';
import {useRouter} from 'vue-router';

const conferences = ref([]);

const router = useRouter();

const fetchData = async () => {
  try {
    const response = await axios.get('/conferences');
    conferences.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Ocorreu um erro ao buscar as conferências:', error);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

const handleLecturesInput = async (event, conferenceId) => {
  try {
    const file = event.target.files[0]

    var formData = new FormData();
    formData.append("file", file);

    await axios.post(`conferences/${conferenceId}/organize`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    router.push({ path: `/conference/${conferenceId}` })
  } catch (error) {
    console.error('Ocorreu um erro ao enviar os arquivos para processamento:', error);
  }
};

onMounted(fetchData);
</script>

<style>
/* Estilos da tabela */
.conferences-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.conferences-table th,
.conferences-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.conferences-table th {
  background-color: #f2f2f2;
}

.file-upload-btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.file-input {
  display: none;
}
</style>