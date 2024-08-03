// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {},
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/send-message": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "socket"
                ],
                "summary": "Send message to socket",
                "operationId": "send-message-to-socket",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/schemas.MessageResponse"
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "No Content"
                    }
                }
            }
        },
        "/ws": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "socket"
                ],
                "summary": "Connect to socket",
                "operationId": "connect-socket",
                "parameters": [
                    {
                        "type": "string",
                        "description": "token",
                        "name": "token",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "204": {
                        "description": "No Content"
                    }
                }
            }
        }
    },
    "definitions": {
        "schemas.MessageReader": {
            "type": "object",
            "required": [
                "imageUrl",
                "name",
                "readDate",
                "userId"
            ],
            "properties": {
                "imageUrl": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "readDate": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "schemas.MessageResponse": {
            "type": "object",
            "required": [
                "message",
                "messageReaders",
                "ownerId",
                "ownerImageUrl",
                "ownerName",
                "roomId"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "messageReaders": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.MessageReader"
                    }
                },
                "ownerId": {
                    "type": "string"
                },
                "ownerImageUrl": {
                    "type": "string"
                },
                "ownerName": {
                    "type": "string"
                },
                "roomId": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "",
	Host:             "",
	BasePath:         "",
	Schemes:          []string{},
	Title:            "",
	Description:      "",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	LeftDelim:        "{{",
	RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
