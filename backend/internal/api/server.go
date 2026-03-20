package api

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Server struct{}

func NewServer() Server { return Server{} }

func (s Server) Signup(c *gin.Context) {
	var body SignupJSONRequestBody
	err := c.Bind(&body)
	if err != nil {
		c.JSON(http.StatusBadRequest, "Invalid request for signup")
	}

	fmt.Println(body)

	c.JSON(http.StatusCreated, SignupResponse{
		AccessToken:  "a",
		RefreshToken: "b",
	})
}
