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
        "/rooms": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Create room for user",
                "operationId": "create-room",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/schemas.CreateRoomPayload"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.RoomPopulatedResponse"
                        }
                    }
                }
            }
        },
        "/rooms/list/{roomType}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Get rooms for user",
                "operationId": "get-rooms",
                "parameters": [
                    {
                        "type": "string",
                        "description": "room type: private, group",
                        "name": "roomType",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.GetRoomsResponse"
                        }
                    }
                }
            }
        },
        "/rooms/preview": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Get chat preview",
                "operationId": "get-chat preview",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.GetChatPreviewResponse"
                        }
                    }
                }
            }
        },
        "/rooms/{roomId}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Get room by id",
                "operationId": "get-room-by-id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "room Id",
                        "name": "roomId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.RoomPopulatedResponse"
                        }
                    }
                }
            },
            "patch": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Update room",
                "operationId": "update-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "room Id",
                        "name": "roomId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.RoomPopulatedResponse"
                        }
                    }
                }
            }
        },
        "/rooms/{roomId}/messages": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Create message in room",
                "operationId": "create-message-in-room",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/schemas.CreateMessagePayload"
                        }
                    },
                    {
                        "type": "string",
                        "description": "room Id",
                        "name": "roomId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.MessageResponse"
                        }
                    }
                }
            }
        },
        "/rooms/{roomId}/users/{userId}": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Add user to room",
                "operationId": "add-user-to-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "room Id",
                        "name": "roomId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "user Id to delete",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.RoomPopulatedResponse"
                        }
                    }
                }
            },
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "room"
                ],
                "summary": "Delete user from room",
                "operationId": "delete-user-from-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "room Id",
                        "name": "roomId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "type": "string",
                        "description": "user Id to delete",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.RoomPopulatedResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "schemas.CreateMessagePayload": {
            "type": "object",
            "required": [
                "message"
            ],
            "properties": {
                "message": {
                    "type": "string"
                }
            }
        },
        "schemas.CreateRoomPayload": {
            "type": "object",
            "required": [
                "name",
                "roomType",
                "userId"
            ],
            "properties": {
                "name": {
                    "type": "string",
                    "x-nullable": true
                },
                "roomType": {
                    "type": "string"
                },
                "userId": {
                    "type": "string",
                    "x-nullable": true
                }
            }
        },
        "schemas.GetChatPreviewResponse": {
            "type": "object",
            "required": [
                "unreadMessagesAmount"
            ],
            "properties": {
                "unreadMessagesAmount": {
                    "type": "integer"
                }
            }
        },
        "schemas.GetRoomsResponse": {
            "type": "object",
            "required": [
                "rooms",
                "size"
            ],
            "properties": {
                "rooms": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.RoomPreviewResponse"
                    }
                },
                "size": {
                    "type": "integer"
                }
            }
        },
        "schemas.MessageReaders": {
            "type": "object",
            "required": [
                "readDate",
                "userId"
            ],
            "properties": {
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
                "ownerId"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "messageReaders": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.MessageReaders"
                    }
                },
                "ownerId": {
                    "type": "string"
                }
            }
        },
        "schemas.RoomPopulatedResponse": {
            "type": "object",
            "required": [
                "isBlocked",
                "messages",
                "name",
                "roomId",
                "users"
            ],
            "properties": {
                "isBlocked": {
                    "type": "boolean"
                },
                "messages": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.MessageResponse"
                    }
                },
                "name": {
                    "type": "string",
                    "x-nullable": true
                },
                "roomId": {
                    "type": "string"
                },
                "users": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.UserResponse"
                    }
                }
            }
        },
        "schemas.RoomPreviewResponse": {
            "type": "object",
            "required": [
                "isBlocked",
                "name",
                "roomId",
                "users"
            ],
            "properties": {
                "isBlocked": {
                    "type": "boolean"
                },
                "name": {
                    "type": "string",
                    "x-nullable": true
                },
                "roomId": {
                    "type": "string"
                },
                "users": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.UserResponse"
                    }
                }
            }
        },
        "schemas.UserResponse": {
            "type": "object",
            "required": [
                "role",
                "userId"
            ],
            "properties": {
                "role": {
                    "type": "string"
                },
                "userId": {
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
