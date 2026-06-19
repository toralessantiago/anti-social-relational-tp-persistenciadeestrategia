# 🚀 UnaHur Anti-Social Net - Backend API

Backend desarrollado para **UnaHur Anti-Social Net**, una red social inspirada en plataformas modernas que permite la gestión de usuarios, publicaciones, comentarios, seguidores y etiquetas.

## 📋 Características

- Gestión de usuarios.
- Creación y administración de publicaciones.
- Asociación de imágenes a publicaciones.
- Sistema de comentarios.
- Sistema de seguidores (Followers/Following).
- Gestión de etiquetas (Tags).
- Asociación de Tags a publicaciones.
- Validación de datos mediante Joi.
- Documentación de API mediante Swagger.
- Persistencia de datos utilizando Sequelize ORM.

---

# 🛠️ Tecnologías utilizadas

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- MySQL (opcional)
- Joi
- Swagger
- dotenv

---

# 📂 Estructura del proyecto

```text
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── config/
├── data/
├── swagger.yml
├── DER.md
├── main.js
├── package.json
└── .env
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/EP-UnaHur-2026C1/anti-social-relational-tp-persistenciadeestrategia.git
cd anti-social-relational-tp-persistenciadeestrategia
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

### SQLite

```env
PORT=3000

NODE_ENV=development

DB_DIALECT=sqlite
DB_STORAGE=./data/data.sqlite

MESES_VISIBLES=6
```

### MySQL

```env
PORT=3000

NODE_ENV=development

DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=anti-social
DB_USER=root
DB_PASSWORD=1234

MESES_VISIBLES=6
```

---

# ▶️ Ejecución

## Producción

```bash
npm start
```

## Desarrollo

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

# 📚 Swagger

La documentación interactiva puede visualizarse en:

```text
http://localhost:3000/api-docs
```

---

# 🗄️ Modelo de datos

El diagrama entidad-relación completo está documentado en [DER.md](./DER.md).

## User

| Campo | Tipo |
|---------|---------|
| id | Integer |
| nickName | String |
| email | String |
| password | String |

---

## Post

| Campo | Tipo |
|---------|---------|
| id | Integer |
| descripcion | String |
| userId | Integer |

---

## Post_Image

| Campo | Tipo |
|---------|---------|
| id | Integer |
| url | String |
| postId | Integer |

---

## Comment

| Campo | Tipo |
|---------|---------|
| id | Integer |
| content | String |
| visible | Boolean |
| userId | Integer |
| postId | Integer |

---

## Tag

| Campo | Tipo |
|---------|---------|
| id | Integer |
| name | String |

---

## Follow

| Campo | Tipo |
|---------|---------|
| followerId | Integer |
| followingId | Integer |

---

# 🔗 Relaciones

### User

- Tiene muchas publicaciones (`hasMany Post`)
- Tiene muchos comentarios (`hasMany Comment`)
- Tiene muchos seguidores (`belongsToMany User`)
- Sigue a muchos usuarios (`belongsToMany User`)

### Post

- Pertenece a un usuario (`belongsTo User`)
- Tiene muchas imágenes (`hasMany Post_Image`)
- Tiene muchos comentarios (`hasMany Comment`)
- Tiene muchos tags (`belongsToMany Tag`)

### Comment

- Pertenece a un usuario
- Pertenece a una publicación

### Tag

- Puede estar asociado a múltiples publicaciones

---

# 📌 Endpoints

## 👤 Usuarios

### Obtener todos los usuarios

```http
GET /users
```

### Obtener usuario por ID

```http
GET /users/:id
```

### Crear usuario

```http
POST /users
```

Body:

```json
{
  "nickName": "santiago",
  "email": "santiago@email.com",
  "password": "123456"
}
```

### Actualizar usuario

```http
PUT /users/:id
```

### Eliminar usuario

```http
DELETE /users/:id
```

---

## 📝 Publicaciones

### Obtener publicaciones

```http
GET /posts
```

### Obtener publicación por ID

```http
GET /posts/:id
```

### Crear publicación

```http
POST /posts
```

Body:

```json
{
  "descripcion": "Mi primer post",
  "userId": 1
}
```

### Actualizar publicación

```http
PUT /posts/:id
```

### Eliminar publicación

```http
DELETE /posts/:id
```

---

## 🖼️ Imágenes de publicaciones

### Obtener imágenes de un post

```http
GET /posts/:id/images
```

### Agregar imagen

```http
POST /posts/:id/images
```

Body:

```json
{
  "url": "https://miimagen.com/foto.jpg"
}
```

### Eliminar imagen

```http
DELETE /posts/:id/images/:imageId
```

---

## 🏷️ Tags

### Obtener todos los tags

```http
GET /tags
```

### Obtener tag por ID

```http
GET /tags/:id
```

### Crear tag

```http
POST /tags
```

Body:

```json
{
  "name": "programacion"
}
```

### Actualizar tag

```http
PUT /tags/:id
```

### Eliminar tag

```http
DELETE /tags/:id
```

---

## 🔖 Asociación Post-Tag

### Asignar múltiples tags

```http
POST /posts/:id/tags
```

Body:

```json
{
  "tagsIds": [1, 2, 3]
}
```

### Asociar un tag

```http
POST /posts/:id/tags/:tagId
```

### Desasociar un tag

```http
DELETE /posts/:id/tags/:tagId
```

---

## 💬 Comentarios

### Obtener comentarios

```http
GET /comments
```

### Crear comentario

```http
POST /comments
```

Body:

```json
{
  "content": "Excelente publicación",
  "userId": 1,
  "postId": 1
}
```

### Actualizar comentario

```http
PUT /comments/:id
```

### Eliminar comentario

```http
DELETE /comments/:id
```

---

## 👥 Seguidores

### Seguir usuario

```http
POST /followers/:userId/:targetId
```

### Dejar de seguir usuario

```http
DELETE /followers/:userId/:targetId
```

### Obtener seguidores

```http
GET /followers/:userId
```

### Obtener seguidos

```http
GET /followers/following/:userId
```

---

# ✅ Validaciones

El proyecto utiliza **Joi** para validar los datos recibidos.

## Usuarios

- nickName obligatorio.
- Entre 3 y 30 caracteres.
- Email válido.
- Contraseña mínima de 6 caracteres.

## Comentarios

- Contenido obligatorio.
- Máximo 500 caracteres.

## Tags

- Nombre obligatorio.
- Entre 2 y 30 caracteres.

## Posts

- Descripción obligatoria.


---

# 👨‍💻 Integrantes

- Estefania Abigail Almirón
- Sofía Agustina Gómez
- Gonzalo Martin Herlein
- Santiago Roberto Torales
- Thomas Vai

---

# 🎓 Universidad

Trabajo práctico desarrollado para la **Universidad Nacional de Hurlingham (UNAHUR)**.

Materia: **Estrategias de persistencias**.

Año: **2026**
