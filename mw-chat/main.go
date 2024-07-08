package main

import (
	"fmt"
	"io"
	"mwchat/config"
	"net/http"
)

func getRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got / request\n")
	io.WriteString(w, "This is my website!\n")
}
func getHello(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("got /hello request\n")
	io.WriteString(w, "Hello, HTTP!\n")
}

func main() {
	http.HandleFunc("/chat/", getRoot)
	http.HandleFunc("/chat/hello", getHello)

	fmt.Printf("Server listen on port " + config.Env.ServerPort)
	http.ListenAndServe(":"+config.Env.ServerPort, nil)
}
