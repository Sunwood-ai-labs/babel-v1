package models

type Task struct {
    ID int `json:"id"`
    Name string `json:"name"`
    Priority int `json:"priority"`
    EstimatedDuration float64 `json:"estimatedDuration"`
}
