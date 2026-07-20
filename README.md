# TaskFlow AI

AI-powered daily task planner built with Codex + GPT-5.6 for OpenAI Build Week.

## What It Does

TaskFlow AI is a smart productivity tool that helps you plan your day with AI-generated insights. It analyzes your tasks, provides priority-based suggestions, breaks down complex tasks into manageable subtasks, and tracks your daily productivity.

## Features

- **Smart Task Entry**: Add tasks with natural language descriptions
- **AI Insights**: Each task gets an AI-generated insight based on priority and context
- **Task Breakdown**: Automatically break complex tasks into smaller subtasks
- **Priority Management**: Visual priority indicators (high/medium/low)
- **Category Organization**: Organize tasks by work, personal, health, or learning
- **Daily Summary**: Track your productivity with real-time statistics
- **Productivity Score**: See your completion rate at a glance

## How It Was Built

This project was built entirely using **Codex with GPT-5.6** during OpenAI Build Week. The entire codebase - from the Express.js backend to the responsive frontend - was generated through iterative prompting with Codex.

### Built With
- Node.js + Express (backend API)
- Vanilla HTML/CSS/JavaScript (frontend)
- AI-powered task analysis engine

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   npm install
3. Start the server:
   npm start
4. Open http://localhost:3000 in your browser

## API Endpoints

- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id/complete - Mark task as complete
- DELETE /api/tasks/:id - Delete a task
- POST /api/tasks/:id/breakdown - Get AI task breakdown
- GET /api/summary - Get daily productivity summary

## Track

Work and Productivity - Tools that make teams faster or more effective.

## License

MIT