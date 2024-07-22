package scheduler

import (
    "sort"

    "github.com/yourusername/llm-task-scheduler/internal/models"
)

func ScheduleTasks(tasks []models.Task) []models.Task {
    sort.Slice(tasks, func(i, j int) bool {
        return tasks[i].Priority > tasks[j].Priority
    })
    return tasks
}
