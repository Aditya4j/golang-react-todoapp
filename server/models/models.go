package models

import "github.com/Aditya4j/golang-react-todo/database"

type ToDoList struct {
	Id     int    `json:"id,omitempty" gorm:"primaryKey"`
	Task   string `json:"task,omitempty"`
	Status bool   `json:"status,omitempty"`
}

func init() {
	database.ConnectDB()
	database.Db.AutoMigrate(&ToDoList{})
}

func GetAllTasks() ([]ToDoList, error) {
	var tasks []ToDoList
	result := database.Db.Find(&tasks)
	return tasks, result.Error
}

func InsertOneTask(task ToDoList) error {
	result := database.Db.Create(&task)
	return result.Error
}

func CompleteTask(id int) error {
	result := database.Db.Model(&ToDoList{}).Where("id = ?", id).Update("status", true)
	return result.Error
}

func UndoTask(id int) error {
	result := database.Db.Model(&ToDoList{}).Where("id = ?", id).Update("status", false)
	return result.Error
}

func DeleteOneTask(id int) error {
	result := database.Db.Where("id", id).Delete(&ToDoList{})
	return result.Error
}

func DeleteAllTasks() (int64, error) {
	result := database.Db.Exec("DELETE FROM to_do_lists")
	return result.RowsAffected, result.Error
}
