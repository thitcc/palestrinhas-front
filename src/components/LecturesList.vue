<template>
  <div>
    <h2>Lista de Palestras</h2>
    <table class="lectures-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Duração (min)</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lecture in lectures" :key="lecture.id">
          <td>{{ lecture.title }}</td>
          <td>{{ lecture.duration }}</td>
          <td>
            <button class="edit-button" @click="openEditModal(lecture)">Editar</button>
            <button class="remove-button" @click="removeLecture(lecture.id)">Remover</button>
          </td>
        </tr>
      </tbody>
    </table>

        <!-- Modal para edição -->
    <div v-if="showModal" class="modal-container">
      <div class="modal-overlay" @click="closeEditModal"></div>
      <div class="modal">
        <h3>Editar Palestra</h3>
        <form class="modal-form">
          <div class="form-group">
            <label for="edit-title">Título</label>
            <input id="edit-title" type="text" v-model="editingLecture.title" class="form-control" />
          </div>
          <div class="form-group">
            <label for="edit-duration">Duração (min)</label>
            <input id="edit-duration" type="number" v-model="editingLecture.duration" class="form-control" />
          </div>
          <div class="form-actions">
            <button @click="closeEditModal" class="btn btn-secondary mr">Cancelar</button>
            <button @click="updateLecture" class="btn btn-primary">Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axiosConfig';

const lectures = ref([]);
const showModal = ref(false);
const editingLecture = ref({});

const fetchData = async () => {
  try {
    const response = await axios.get('/lectures');
    lectures.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Ocorreu um erro ao buscar as palestras:', error);
  }
};

const openEditModal = (lecture) => {
  editingLecture.value = { ...lecture };
  showModal.value = true;
};

const closeEditModal = () => {
  showModal.value = false;
};

const updateLecture = async () => {
  try {
    await axios.put(`/lectures/${editingLecture.value.id}`, {title: editingLecture.value.title, duration: editingLecture.value.duration});
    const index = lectures.value.findIndex(l => l.id === editingLecture.value.id);
    lectures.value[index] = { ...editingLecture.value };
    closeEditModal();
  } catch (error) {
    console.error(`Ocorreu um erro ao atualizar a palestra:`, error);
  }
};

const removeLecture = async (lectureId) => {
  try {
    await axios.delete(`/lectures/${lectureId}`);
    lectures.value = lectures.value.filter(lecture => lecture.id !== lectureId);
  } catch (error) {
    console.error(`Ocorreu um erro ao remover a palestra com ID ${lectureId}:`, error);
  }
};

onMounted(fetchData);
</script>

<style>
.lectures-list {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
}

.lecture-item {
  list-style-type: none;
  padding: 10px;
  margin: 5px 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.edit-button {
  margin-left: 10px;
}

.remove-button {
  margin-left: 10px;
  background-color: #dc3545;
}

.remove-button:hover {
  background-color: #c82333;
}

.lectures-table {
  width: 100%;
  border-collapse: collapse;
}

.lectures-table th, .lectures-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.lectures-table th {
  background-color: #f2f2f2;
}

.lectures-table tr:hover {
  background-color: #f5f5f5;
}

.edit-button {
  margin-right: 10px;
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  z-index: 1001;
}

.modal-form .form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  text-align: right;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #ccc;
  color: black;
}


.mr {
  margin-right: 8px;
}
</style>
