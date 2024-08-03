package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// Middleware to handle CORS
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set the CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// If it's an OPTIONS request, just return OK
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}

//	var upgrader = websocket.Upgrader{
//		ReadBufferSize:  1024,
//		WriteBufferSize: 1024,
//	}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins
	},
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("1")
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()
	fmt.Println("2")
	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println("Received message:", string(message))

		err = conn.WriteMessage(messageType, message)
		if err != nil {
			log.Println(err)
			return
		}
	}
}

func main() {
	// newConfig, err := config.LoadConfig("")
	// if err != nil {
	// 	log.Fatal("cannot load config:", err)
	// }

	// controllers := controllers.NewController()

	// newServer := server.NewServer(&newConfig)
	// newServer.SetRoutes(controllers)

	// if newConfig.EnvType == "prod" {
	// 	log.Fatal(newServer.GinServer.RunTLS(":"+newConfig.ServerPort, "./server.crt", "./server.key"))
	// } else {
	// 	log.Fatal(newServer.GinServer.Run(":" + newConfig.ServerPort))
	// }

	fmt.Println("Server run on :7994")

	http.HandleFunc("/ws", wsHandler)
	log.Fatal(http.ListenAndServe(":7994", corsMiddleware(http.DefaultServeMux)))
}
