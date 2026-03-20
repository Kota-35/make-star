package main

import (
	"make-star-backend/internal/api"

	"github.com/gin-gonic/gin"
	middleware "github.com/oapi-codegen/gin-middleware"
)

func main() {
	swagger, err := api.GetSwagger()
	if err != nil {
		panic(err)
	}
	// HACK: swagger specのserversフィールドを空にする。
	// これにより、サーバー名が一致するかどうかの検証をスキップする。
	// このサーバーがどのように起動されるか、実行時までわからないため。
	// ref: https://github.com/oapi-codegen/oapi-codegen/blob/00a90b7a03f4cdc8bc8daf16eea6868b48c7d278/examples/petstore-expanded/gin/petstore.go#L28-L30
	swagger.Servers = nil

	server := api.NewServer()
	r := gin.Default()
	r.Use(middleware.OapiRequestValidator(swagger))

	api.RegisterHandlers(r, server)

	r.Run(":4000")
}
