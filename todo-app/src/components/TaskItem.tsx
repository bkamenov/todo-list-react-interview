import React from 'react';
import { Task } from '../types';
import { updateTask, deleteTask } from '../services/task-service';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const handleStatusChange = async () => {
    const updatedTask = await updateTask(task.id, { status: task.status === 'pending' ? 'completed' : 'pending' });
    onTaskUpdated(updatedTask);
  };

  const handleDelete = async () => {
    await deleteTask(task.id);
    onTaskDeleted(task.id);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="secondary" onClick={handleStatusChange} sx={{ mr: 2 }}>
            {task.status === 'pending' ? 'Complete' : 'Undo'}
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
