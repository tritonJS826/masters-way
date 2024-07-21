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
        "/group-rooms": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Get group rooms preview for user",
                "operationId": "get-group-rooms",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.GetRoomsResponse"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Create group rooms for user",
                "operationId": "create-group-rooms",
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
        "/group-rooms/requests": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Get requests to group room",
                "operationId": "get-requests-to-group-room",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.GetRequestsToGroupRoomResponse"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Create requests to group room",
                "operationId": "create-requests-to-group-room",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/schemas.CreateRequestToGroupRoomPayload"
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
        "/group-rooms/{groupRoomId}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Get group room by id",
                "operationId": "get-group-room-by-id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "group room Id",
                        "name": "groupRoomId",
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
                    "group"
                ],
                "summary": "Update group rooms for user",
                "operationId": "update-group-rooms",
                "parameters": [
                    {
                        "type": "string",
                        "description": "group room Id",
                        "name": "groupRoomId",
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
        "/group-rooms/{groupRoomId}/messages": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Create message to group room",
                "operationId": "create-message-in-group-room",
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
                        "description": "group room Id",
                        "name": "groupRoomId",
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
        "/group-rooms/{groupRoomId}/requests/accept": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Accept request to group room",
                "operationId": "accept-request-to-group-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "groupRoom Id to accept request",
                        "name": "groupRoomId",
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
        "/group-rooms/{groupRoomId}/requests/decline": {
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Decline request to group room",
                "operationId": "decline-request-to-group-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "groupRoom Id to delete request",
                        "name": "groupRoomId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.DeclineRequestToGroupRoomResponse"
                        }
                    }
                }
            }
        },
        "/group-rooms/{groupRoomId}/users/{userId}": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "group"
                ],
                "summary": "Add user to group room",
                "operationId": "add-user-to-group",
                "parameters": [
                    {
                        "type": "string",
                        "description": "group room Id",
                        "name": "groupRoomId",
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
                    "group"
                ],
                "summary": "Delete user to group room",
                "operationId": "delete-user-to-group",
                "parameters": [
                    {
                        "type": "string",
                        "description": "group room Id",
                        "name": "groupRoomId",
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
        },
        "/p2p-rooms": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "p2p"
                ],
                "summary": "Get p2p rooms for user",
                "operationId": "get-p2p-rooms",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/schemas.GetRoomsResponse"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "p2p"
                ],
                "summary": "Create p2p room for user",
                "operationId": "create-p2p-room",
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
        "/p2p-rooms/{p2pRoomId}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "p2p"
                ],
                "summary": "Get p2p room by id",
                "operationId": "get-p2p-room-by-id",
                "parameters": [
                    {
                        "type": "string",
                        "description": "p2p room Id",
                        "name": "p2pRoomId",
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
            },
            "patch": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "p2p"
                ],
                "summary": "Update p2p room for user",
                "operationId": "update-p2p-room",
                "parameters": [
                    {
                        "type": "string",
                        "description": "p2p room Id",
                        "name": "p2pRoomId",
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
        "/p2p-rooms/{p2pRoomId}/messages": {
            "post": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "p2p"
                ],
                "summary": "Create message in p2p room",
                "operationId": "make-message-in-p2p-room",
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
                        "description": "p2p room Id",
                        "name": "p2pRoomId",
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
        }
    },
    "definitions": {
        "schemas.CreateMessagePayload": {
            "type": "object",
            "required": [
                "message",
                "roomId"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "roomId": {
                    "type": "string"
                }
            }
        },
        "schemas.CreateRequestToGroupRoomPayload": {
            "type": "object",
            "required": [
                "roomId",
                "userId"
            ],
            "properties": {
                "roomId": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "schemas.DeclineRequestToGroupRoomResponse": {
            "type": "object",
            "required": [
                "roomId"
            ],
            "properties": {
                "roomId": {
                    "type": "string"
                }
            }
        },
        "schemas.GetRequestsToGroupRoomResponse": {
            "type": "object",
            "required": [
                "requests"
            ],
            "properties": {
                "requests": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/schemas.RequestToGroupRoom"
                    }
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
        "schemas.MessageResponse": {
            "type": "object",
            "required": [
                "message",
                "ownerId"
            ],
            "properties": {
                "message": {
                    "type": "string"
                },
                "ownerId": {
                    "type": "string"
                }
            }
        },
        "schemas.RequestToGroupRoom": {
            "type": "object",
            "required": [
                "roomId",
                "senderId"
            ],
            "properties": {
                "roomId": {
                    "type": "string"
                },
                "senderId": {
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
                "roomId"
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
                    "type": "string"
                },
                "roomId": {
                    "type": "string"
                }
            }
        },
        "schemas.RoomPreviewResponse": {
            "type": "object",
            "required": [
                "isBlocked",
                "name",
                "roomId"
            ],
            "properties": {
                "isBlocked": {
                    "type": "boolean"
                },
                "name": {
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