import axios from 'axios';
import { Task } from '../types';

const API_URL = 'http://localhost:3210/tasks';

//C
export const createTask = async (task: Omit<Task, 'id'>) => {
  const response = await axios.post<Task>(API_URL, task);
  return response.data;
};

//R
export const readTasks = async () => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

//U
export const updateTask = async (id: string, task: Partial<Task>) => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, task);
  return response.data;
};

//D
export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
