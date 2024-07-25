package main

import (
    "log"
    "net/http"

    "github.com/yourusername/llm-task-scheduler/internal/api"
)

func main() {
    http.HandleFunc("/tasks", api.TasksHandler)
    http.HandleFunc("/schedule", api.ScheduleHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
