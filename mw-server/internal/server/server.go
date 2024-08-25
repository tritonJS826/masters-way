package server

import (
	"mwserver/internal/config"
	"mwserver/internal/routers"
	"net/http"
)

type Server struct {
	httpServer *http.Server
	router     *routers.Router
}

func NewServer(cfg *config.Config, router *routers.Router) *Server {
	// TODO: Rename ServerAddress to ServerPort
	httpServer := &http.Server{
		Addr:    ":" + cfg.ServerAddress,
		Handler: router.Gin,
	}

	return &Server{
		httpServer: httpServer,
		router:     router,
	}
}

func (server *Server) Run() error {
	return server.httpServer.ListenAndServe()
}
