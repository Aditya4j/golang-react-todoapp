package router

import (
	"github.com/Aditya4j/golang-react-todo/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/task", middleware.GetAllTasks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/task", middleware.CreateTask).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/task/{id}", middleware.TaskComplete).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteTask/{id}", middleware.TaskDelete).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/undo/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	router.HandleFunc("/api/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")
	return router

}
