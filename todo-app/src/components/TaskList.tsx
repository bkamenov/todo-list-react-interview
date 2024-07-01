import React, { useEffect, useState } from 'react';
import { readTasks } from '../services/task-service';
import { Task } from '../types';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Box, Typography } from '@mui/material';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await readTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDeleted = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mt: "20px" }}>Task List</Typography>
      <TaskForm onTaskCreated={handleTaskCreated} />
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
      ))}
    </Box>
  );
};

export default TaskList;
