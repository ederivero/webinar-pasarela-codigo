export default {
  "swagger": "2.0",
  "info": {
    "description": "Documentación de la API de Punto de Venta CodiGo-POS",
    "version": "1.0.0",
    "title": "CodiGo - POS",
    "contact": {
      "email": "jorgegarba@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": [
    "codigo4-pos.herokuapp.com/"
  ],
  "tags": [
    {
      "name": "pedido",
      "description": "Todas las rutas del recurso pedido"
    },
    {
      "name": "mesa",
      "description": "Todas las rutas del recurso Mesa"
    },
    {
      "name": "auth",
      "description": "Todas las rutas de la autenticación"
    },
    {
      "name": "categoria",
      "description": "Todas las rutas del recurso Categoría"
    }
  ],
  "schemes": [
    "https"
  ],
  "paths": {
    "/pedido": {
      "post": {
        "tags": [
          "pedido"
        ],
        "summary": "Crear un nuevo pedido",
        "description": "",
        "operationId": "postPedido",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto complejo de un pedido junto con los platos",
            "required": true,
            "schema": {
              "$ref": "#/definitions/PedidoYPlatos"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Creado con éxito"
          }
        }
      }
    },
    "/plato": {
      "post": {
        "tags": [
          "plato"
        ],
        "summary": "Crear un nuevo Plato",
        "description": "",
        "operationId": "postPlato",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto de un recurso Plato",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Plato"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Creado con éxito"
          }
        }
      }
    },
    "/plato/imagen/upload": {
      "get": {
        "tags": [
          "plato"
        ],
        "summary": "Subir una imagen a la nube para luego, asociarlo con un plato",
        "description": "",
        "operationId": "platoImageUpload",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "imagen",
            "in": "formData",
            "description": "Archivo a subir",
            "required": true,
            "type": "file"
          }
        ],
        "responses": {
          "200": {
            "description": "Operación exitosa",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/PlatoImagen"
            }
          }
        }
      },
      "post": {
        "tags": [
          "categoria"
        ],
        "summary": "Crear una nueva categoría",
        "description": "",
        "operationId": "postCategoria",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto del modelo Categoria",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Categoria"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Creado con éxito"
          }
        }
      }
    },
    "/categoria": {
      "get": {
        "tags": [
          "categoria"
        ],
        "summary": "Obtener todas las categorías de platos",
        "description": "",
        "operationId": "getCategorias",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {}
        ],
        "responses": {
          "200": {
            "description": "Operación exitosa",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Categoria"
              }
            }
          }
        }
      },
      "post": {
        "tags": [
          "categoria"
        ],
        "summary": "Crear una nueva categoría",
        "description": "",
        "operationId": "postCategoria",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto del modelo Categoria",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Categoria"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Creado con éxito"
          }
        }
      }
    },
    "/categoria/:id/platos": {
      "get": {
        "tags": [
          "categoria"
        ],
        "summary": "Obtiene un objeto Categoria y la lista de platos que ésta posee dado el id de la categoría",
        "description": "",
        "operationId": "getMesaById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "params",
            "name": "id",
            "description": "Id de la categoría",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Operación exitosa",
            "schema": {
              "type": "object",
              "$ref": "#/definitions/CategoriaPlatos"
            }
          }
        }
      }
    },
    "/mesa": {
      "get": {
        "tags": [
          "mesa"
        ],
        "summary": "Listar las mesas",
        "description": "Obtiene un arreglo de las mesas en la bd",
        "operationId": "getMesas",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Operación exitosa",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Mesa"
              }
            }
          },
          "500": {
            "description": "El servidor no está disponible"
          }
        }
      },
      "post": {
        "tags": [
          "mesa"
        ],
        "summary": "Crear una mesa",
        "description": "Crea una mesa en la base de datos",
        "operationId": "postMesa",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto del modelo mesa",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Mesa"
            }
          }
        ]
      }
    },
    "/mesa/:id": {
      "get": {
        "tags": [
          "mesa"
        ],
        "summary": "Obtiene una mesa por Id",
        "description": "",
        "operationId": "getMesaById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "description": "Id de la mesa a obtener",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Mesa"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Consulta exitosa"
          }
        }
      },
      "put": {
        "tags": [
          "mesa"
        ],
        "summary": "Edita un registro mesa",
        "description": "",
        "operationId": "putMesaById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "description": "Id de la mesa a editar",
            "required": true
          },
          {
            "in": "body",
            "name": "body",
            "description": "Objeto del modelo mesa",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Mesa"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Consulta exitosa"
          }
        }
      },
      "delete": {
        "tags": [
          "mesa"
        ],
        "summary": "Elimina un registro mesa",
        "description": "",
        "operationId": "deleteMesaById",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "id",
            "description": "Id de la mesa a eliminar",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Consulta exitosa"
          }
        }
      }
    },
    "/usuario": {
      "get": {
        "tags": [
          "auth"
        ],
        "summary": "Listar a los usuarios",
        "description": "Lista a los usuarios de la base de datos",
        "operationId": "getUsuarios",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Operación exitosa",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Usuario"
              }
            }
          },
          "500": {
            "description": "El servidor no está disponible"
          }
        }
      }
    },
    "/registro": {
      "post": {
        "tags": [
          "auth"
        ],
        "summary": "Registrar usuario",
        "description": "Crear un usuario en la base de datos",
        "operationId": "postUsuario",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Objeto del modelo usuario",
            "required": true,
            "schema": {
              "$ref": "#/definitions/UsuarioPost"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Operación exitosa",
            "schema": {
              "type": "object",
              "items": {
                "$ref": "#/definitions/Usuario"
              }
            }
          },
          "500": {
            "description": "El servidor no está disponible"
          }
        }
      }
    }
  },
  "definitions": {
    "UsuarioPost": {
      "type": "object",
      "required": [
        "mesa_nro",
        "mesa_cap"
      ],
      "properties": {
        "usu_email": {
          "type": "string"
        },
        "usu_nom": {
          "type": "string"
        },
        "usu_ape": {
          "type": "string"
        },
        "usu_tipo": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    },
    "Mesa": {
      "type": "object",
      "required": [
        "mesa_nro",
        "mesa_cap"
      ],
      "properties": {
        "mesa_id": {
          "type": "integer",
          "format": "int64"
        },
        "mesa_nro": {
          "type": "string"
        },
        "mesa_cap": {
          "type": "integer"
        }
      }
    },
    "Categoria": {
      "type": "object",
      "required": [
        "categoria_nom"
      ],
      "properties": {
        "categoria_id": {
          "type": "integer",
          "format": "int64"
        },
        "categoria_nom": {
          "type": "string"
        }
      }
    },
    "Usuario": {
      "type": "object",
      "required": [],
      "properties": {
        "usu_id": {
          "type": "integer"
        },
        "usu_email": {
          "type": "string"
        },
        "usu_nom": {
          "type": "string"
        },
        "usu_ape": {
          "type": "string"
        },
        "usu_tipo": {
          "type": "string"
        },
        "usu_hash": {
          "type": "string"
        },
        "usu_salt": {
          "type": "string"
        }
      }
    },
    "Plato": {
      "type": "object",
      "properties": {
        "plato_id": {
          "type": "integer",
          "format": "int64"
        },
        "plato_nom": {
          "type": "string"
        },
        "plato_img": {
          "type": "string"
        },
        "plato_pre": {
          "type": "integer",
          "formart": "double"
        },
        "categoria_id": {
          "type": "integer"
        }
      }
    },
    "CategoriaPlatos": {
      "type": "object",
      "properties": {
        "ok": {
          "type": "boolean"
        },
        "content": {
          "items": {
            "type": "object",
            "properties": {
              "categoria_id": {
                "type": "integer"
              },
              "categoria_nom": {
                "type": "string"
              },
              "Platos": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/Plato"
                }
              }
            }
          }
        }
      }
    },
    "PedidoYPlatos": {
      "type": "object",
      "properties": {
        "pedido_fech": {
          "type": "string"
        },
        "pedido_nro": {
          "type": "string"
        },
        "pedido_est": {
          "type": "string"
        },
        "usu_id": {
          "type": "integer"
        },
        "mesa_id": {
          "type": "integer"
        },
        "pedidoplatos": {
          "type": "array",
          "items": {
            "properties": {
              "plato_id": {
                "type": "integer"
              },
              "peditoplato_cant": {
                "type": "integer"
              }
            }
          }
        }
      }
    },
    "PlatoImagen": {
      "type": "object",
      "properties": {
        "ok": {
          "type": "boolean"
        },
        "content": {
          "type": "string"
        },
        "url": {
          "type": "string"
        }
      }
    }
  },
  "externalDocs": {
    "description": "Encuentra todo sobre cómo documentar APIs",
    "url": "http://swagger.io"
  }
}