package api

import (
    "encoding/json"
    "net/http"

    "github.com/yourusername/llm-task-scheduler/internal/models"
    "github.com/yourusername/llm-task-scheduler/internal/scheduler"
    "github.com/yourusername/llm-task-scheduler/internal/predictor"
)

func TasksHandler(w http.ResponseWriter, r *http.Request) {
    // Implement CRUD operations for tasks
}

func ScheduleHandler(w http.ResponseWriter, r *http.Request) {
    tasks := []models.Task{
        {ID: 1, Name: "Task 1", Priority: 1, EstimatedDuration: 10},
        {ID: 2, Name: "Task 2", Priority: 2, EstimatedDuration: 5},
    }

    scheduledTasks := scheduler.ScheduleTasks(tasks)
    predictedDurations := predictor.PredictDurations(scheduledTasks)

    response := struct {
        ScheduledTasks []models.Task `json:"scheduledTasks"`
        PredictedDurations map[int]float64 `json:"predictedDurations"`
    }{
        ScheduledTasks: scheduledTasks,
        PredictedDurations: predictedDurations,
    }

    json.NewEncoder(w).Encode(response)
}
