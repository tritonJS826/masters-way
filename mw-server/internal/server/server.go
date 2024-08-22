package server

import (
	"mwserver/internal/config"
	"mwserver/internal/routers"
	"net/http"

	"github.com/gin-contrib/cors"
)

type Server struct {
	cfg        *config.Config
	httpServer *http.Server
	router     *routers.Router
}

func NewServer(cfg *config.Config, router *routers.Router) *Server {
	// Apply CORS middleware with custom options
	router.Gin.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.WebappBaseUrl},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// TODO: Rename ServerAddress to ServerPort
	httpServer := &http.Server{
		Addr:    ":" + cfg.ServerAddress,
		Handler: router.Gin,
	}

	return &Server{
		cfg:        cfg,
		httpServer: httpServer,
		router:     router,
	}
}

func (server *Server) Run() error {
	return server.httpServer.ListenAndServe()
}
