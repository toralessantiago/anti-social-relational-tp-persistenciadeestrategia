# Diagrama Entidad-Relación (DER) — Anti-Social Net

## Diagrama completo

```mermaid
erDiagram
    User ||--o{ Post : "publica (userId)"
    User ||--o{ Comment : "escribe (userId)"
    Post ||--o{ Comment : "recibe (postId)"
    Post ||--o{ Post_Image : "tiene (postId)"
    Post }o--o{ Tag : "PostTag (postId, tagId)"
    User }o--o{ User : "Follow (followerId, followingId)"

    User {
        integer id PK
        string nickName UK
        string email
        string password
        datetime createdAt
        datetime updatedAt
    }

    Post {
        integer id PK
        string descripcion
        integer userId FK
        datetime createdAt
        datetime updatedAt
    }

    Post_Image {
        integer id PK
        string url
        integer postId FK
        datetime createdAt
        datetime updatedAt
    }

    Comment {
        integer id PK
        string content
        boolean visible
        integer userId FK
        integer postId FK
        datetime createdAt
        datetime updatedAt
    }

    Tag {
        integer id PK
        string name
        datetime createdAt
        datetime updatedAt
    }

    PostTag {
        integer postId FK
        integer tagId FK
        datetime createdAt
        datetime updatedAt
    }

    Follow {
        integer followerId FK
        integer followingId FK
        datetime createdAt
        datetime updatedAt
    }
```

## Relaciones

| Entidad origen | Relación | Entidad destino | Clave foránea |
|----------------|----------|-----------------|---------------|
| User | 1:N | Post | Post.userId → User.id |
| User | 1:N | Comment | Comment.userId → User.id |
| Post | 1:N | Comment | Comment.postId → Post.id |
| Post | 1:N | Post_Image | Post_Image.postId → Post.id |
| Post | N:M | Tag | PostTag (postId, tagId) |
| User | N:M | User (seguidores) | Follow (followerId, followingId) |

## Cardinalidades

- Un **User** puede tener muchos **Posts** y muchos **Comments**.
- Un **Post** pertenece a un **User**, puede tener muchas **Post_Image**, muchos **Comments** y muchos **Tags**.
- Un **Comment** pertenece a un **User** y a un **Post**.
- Un **User** puede seguir y ser seguido por otros **Users** mediante la tabla intermedia **Follow**.
