package main

import (
	"fmt"
	"net/http"

	"github.com/Aditya4j/golang-react-todo/router"
	"github.com/gorilla/handlers"
)

func main() {
	r := router.Router()
	fmt.Println("Starting server on port 8080")

	headers := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:5173"})

	http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(r))

}
