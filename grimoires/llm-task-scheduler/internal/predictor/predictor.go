package predictor

import (
    "math/rand"

    "github.com/yourusername/llm-task-scheduler/internal/models"
)

func PredictDurations(tasks []models.Task) map[int]float64 {
    predictions := make(map[int]float64)
    for _, task := range tasks {
        // モックの予測: 実際の実装では機械学習モデルを使用
        predictions[task.ID] = task.EstimatedDuration * (0.8 + rand.Float64()*0.4)
    }
    return predictions
}
