const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// In-memory task store (use a DB in production)
let tasks = [];
let nextId = 1;

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Add a task
app.post('/api/tasks', (req, res) => {
  const { title, priority, category, estimatedTime } = req.body;
  const task = {
    id: nextId++,
    title: title || 'Untitled task',
    priority: priority || 'medium',
    category: category || 'general',
    estimatedTime: estimatedTime || 30,
    completed: false,
    createdAt: new Date().toISOString(),
    aiInsight: generateInsight(title, priority, category)
  };
  tasks.push(task);
  res.json(task);
});

// Complete a task
app.put('/api/tasks/:id/complete', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = true;
    task.completedAt = new Date().toISOString();
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

// AI-powered task breakdown
app.post('/api/tasks/:id/breakdown', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  const subtasks = generateSubtasks(task);
  res.json({ subtasks });
});

// Daily summary
app.get('/api/summary', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(t => t.createdAt.startsWith(today));
  const completed = todayTasks.filter(t => t.completed);
  const productivity = todayTasks.length > 0 
    ? Math.round((completed.length / todayTasks.length) * 100) 
    : 0;
  
  res.json({
    total: todayTasks.length,
    completed: completed.length,
    pending: todayTasks.length - completed.length,
    productivity: productivity,
    insights: generateDailyInsight(completed.length, todayTasks.length)
  });
});

function generateInsight(title, priority, category) {
  const insights = {
    high: 'This task is marked high priority. Consider tackling it first when your energy is highest.',
    medium: 'Medium priority - schedule this for your regular working hours.',
    low: 'Low priority task. Good candidate for batching with similar tasks.'
  };
  return insights[priority] || insights.medium;
}

function generateSubtasks(task) {
  const baseSubtasks = [
    { title: 'Research and gather resources', time: 15 },
    { title: 'Outline the main components', time: 10 },
    { title: 'Execute the core work', time: 30 },
    { title: 'Review and refine', time: 10 }
  ];
  return baseSubtasks;
}

function generateDailyInsight(completed, total) {
  if (total === 0) return 'No tasks yet. Add your first task to get started!';
  if (completed === total) return 'Amazing! You completed all your tasks today. Time to celebrate!';
  if (completed / total > 0.7) return 'Great progress! You are on track to finish most of your tasks.';
  if (completed / total > 0.4) return 'Steady progress. Consider focusing on your highest priority task next.';
  return 'Just getting started? Try breaking down your first task into smaller steps.';
}

app.listen(PORT, () => {
  console.log('TaskFlow AI running on http://localhost:' + PORT);
});
