# DOCUMENTACIÓN API

## Auth

### Register

_*POST*_ `http://localhost:1234/pinterest-clon-api/auth/register`

[Body:]

```json
{
  "emailAddress": "String",
  "password": "String",
  "username": "String",
  "birthdate": "String<Date>",
  "genderId": "String<UUID>",
  "countryId": "String<UUID>",
  "langId": "String<UUID>",
  "avatarBackground": "String<Hex>",
  "avatarLetterColor": "String<Hex>",
  "avatarLetter": "String<Char>",
  "avatar": "File?"
}
```

(HEADERS): `"Content-type": "multipart/form-data"`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 401 (UNAUTHORIZED)

### LogIn

_*POST*_ `http://localhost:1234/pinterest-clon-api/auth/login`

[Body:]

```json
{
  "emailAddress": "String",
  "password": "String"
}
```

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

### LogOut (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*POST*_ `http://localhost:1234/pinterest-clon-api/auth/logout`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 401 (UNAUTHORIZED)

### Recover account

_*POST*_ `http://localhost:1234/pinterest-clon-api/auth/recover-account`

[Body:]

```json
{
  "emailAddress": "String"
}
```

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Reset password

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/auth/reset-password/:username`

[Body:]

```json
{
  "password": "String"
}
```

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

## Countries

### Get countries

_*GET*_ `http://localhost:1234/pinterest-clon-api/countries`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Get countries by ID (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*GET*_ `http://localhost:1234/pinterest-clon-api/countries/:id`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

## Genders

### Get genders

_*GET*_ `http://localhost:1234/pinterest-clon-api/genders`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Get genders by ID (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*GET*_ `http://localhost:1234/pinterest-clon-api/genders/:id`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

## Languages

### Get languages

_*GET*_ `http://localhost:1234/pinterest-clon-api/languages`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Get languages by ID (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*GET*_ `http://localhost:1234/pinterest-clon-api/languages/:id`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

## Settings (PRÓXIMAMENTE)

### Edit profile

#### Get user public data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/edit-profile`

[RESPONSE]

```json
{
  "userData": {
    "username": "String",
    "avatar_background": "String<Hex>",
    "avatar_letter_color": "String<Hex>",
    "avatar_letter": "String<Char>",
    "name": "String?",
    "surname": "String?"
  }
}
```

#### Edit user data

_*PUT*_ `http://localhost:1234/pinterest-clon-api/settings/edit-profile`

[BODY]

Todos son valores opcionales:

```json
{
  "username": "String?",
  "name": "String?",
  "surname": "String?",
  "about": "String?",
  "website": "String<URL>?"
}
```

#### Get user data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/edit-profile`

[RESPONSE]

```json
{
  "userData": {
    "username": "String",
    "avatar_background": "String<Hex>",
    "avatar_letter_color": "String<Hex>",
    "avatar_letter": "String<Char>",
    "name": "String?",
    "surname": "String?"
  }
}
```

### Profile visibility

#### Get data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/profile-visibility`

[RESPONSE]

```json
{
  "userData": {
    "account_type": "String",
    "private_account": "Boolean"
  }
}
```

#### Convert account

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/profile-visibility/convert-account`

[RESPONSE]

```json
{
  "message": "String"
}
```

#### Private account

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/profile-visibility/private-account`

[RESPONSE]

```json
{
  "message": "String"
}
```

### Security

#### Get data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/account-security`

[RESPONSE]

```json
{
  "userData": {
    "two_factor_authentication": "Boolean"
  }
}
```

#### Toggle 2fa

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/account-security/2fa`

[RESPONSE]

```json
{
  "message": "String"
}
```

### Account management

#### Delete account

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/delete-account`

[RESPONSE]

```json
{
  "message": "String"
}
```

#### Get user data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/`

[RESPONSE]

```json
{
  "userData": {
    "email_address": "String",
    "birthdate": "String<Date>",
    "gender": "String<UUID>",
    "country": "String<UUID>",
    "language": "String<UUID>",
    "account_type": "String"
  }
}
```

#### Edit personal info

_*PUT*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/personal-info`

[BODY]

Todos son valores opcionales:

```json
{
  "gender": "String<UUID>?",
  "country": "String<UUID>?",
  "language": "String<UUID>?",
  "emailAddress": "String?",
  "birthdate": "String<Date>?"
}
```

#### Change password

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/change-password`

[BODY]

```json
{
  "prevPassword": "String",
  "newPassword": "String"
}
```

## Avatar

### Delete avatar

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/avatar`

[RESPONSE]

```json
{
  "message": "String"
}
```

### New avatar

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/avatar`

[Body]

```json
{
  "avatar": "File"
}
```

(HEADERS): `"Content-type": "multipart/form-data"`

## Pins

### Home pins

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins?page=1&limit=10`

_limit_: Máximo de pins a mostrar por carga ejecutada.

_page_: Página actual en la cual se encuentra el usuario (min 1)

[Response]

```json
{
  {
  "pins": [
    {
      "body": "String",
      "title": "String?",
      "url": "String<URL>?",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String<URL>?",
      "avatar_background": "String<Hex>",
      "avatar_letter_color": "String<Hex>",
      "avatar_letter": "String<Char>"
    },
    {
      "body": "String",
      "title": "String?",
      "url": "String<URL>?",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String?",
      "avatar_background": "String<Hex>",
      "avatar_letter_color": "String<Hex>",
      "avatar_letter": "String<Char>"
    }
  ],
  "results": "Number"
}
}
```

### Create pin

_*POST*_ `http://localhost:1234/pinterest-clon-api/pins/create`

[Body] (formData)

```json
{
  "title": "String?",
  "adultContent": "Boolean",
  "altText": "String",
  "description": "String?",
  "topics": "String<UUID>[]?",
  "url": "String<URL>?",
  "body": "File"
}
```

### Like/Unlike pin

_*POST*_ `http://localhost:1234/pinterest-clon-api/pins/like/:id`

[RESPONSE]

```json
{
  "username": "String"
}
```

### Get pin

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[RESPONSE (own pin)]

```json
{
  "pin": {
    "id": "String",
    "title": "String?",
    "description": "String?",
    "topics": "String<UUID>[]?",
    "body": "String",
    "alt_text": "String",
    "likes": "String<Number>",
    "already_liked": "Boolean",
    "comments": "String<Number>",
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "avatar": "String<URL>?",
    "avatar_background": "String<URL>",
    "avatar_letter_color": "String<URL>",
    "avatar_letter": "String<Char>",
    "verified": "Boolean",
    "its_you": "Boolean",
    "followers": "String<Number>"
  }
}
```

[RESPONSE (user pin)]

```json
{
  "pin": {
    "id": "String",
    "title": "String?",
    "description": "String?",
    "topics": "String<UUID>[]?",
    "body": "String",
    "alt_text": "String",
    "url": "String<URL>?",
    "likes": "String<Number>",
    "already_liked": "Boolean",
    "comments": "String<Number>",
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "avatar": "String<URL>?",
    "avatar_background": "String<URL>",
    "avatar_letter_color": "String<URL>",
    "avatar_letter": "String<Char>",
    "verified": "Boolean",
    "its_you": "Boolean",
    "follows_you": "Boolean",
    "following": "Boolean",
    "followers": "String<Number>"
  }
}
```

[RESPONSE (not logged)]

```json
{
  "pin": {
    "id": "String",
    "title": "String?",
    "description": "String?",
    "topics": "String[]?",
    "body": "String",
    "alt_text": "String",
    "likes": "String<Number>",
    "comments": "String<Number>",
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "avatar": "String<URL>?",
    "avatar_background": "String",
    "avatar_letter_color": "String",
    "avatar_letter": "String",
    "verified": "Boolean",
    "followers": "String<Number>"
  }
}
```

NOTA: Los que aparecen como String(Number), son números pero que el JSON los trata como strings. Tener en cuenta que comments hace referencia a la cantidad de comentarios que tiene el pin.

### Get similar pins

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/similar-pins/:id?page=Number&limit=Number`

```json
{
  "pins": [
    {
      "body": "String<UUID>",
      "title": "String?",
      "url": "String<URL>?",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "user_id": "String<UUID>",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String<URL>?",
      "avatar_background": "String<Hex>",
      "avatar_letter_color": "String<Hex>",
      "avatar_letter": "String<Char>",
      "similarity_score": "Number"
    }
  ],
  "results": "Number"
}
```

### Delete pin

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[Response]

```json
{
  "message": "String"
}
```

### Edit pin

_*PUT*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[Body]

```json
{
  "title": "String?",
  "adultContent": "Boolean?",
  "altText": "String?",
  "description": "String?",
  "url": "String?",
  "body": "File",
  "topics": "String<UUID>[]?"
}
```

### Search

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/search?value=h&page=1&limit=10`

_value_: Search input value

_limit_: Máximo de pins a mostrar por carga ejecutada.

_page_: Página actual en la cual se encuentra el usuario (min 1)

[Response]

```json
{
  "pins": [
    {
      "body": "String",
      "title": "String?",
      "url": "String?",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String"
    }
  ],
  "results": "Number"
}
```

_NOTA_ El buscador toma como parámetros de búsqueda
el title y el alt_text

### Search by Category

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/search-by-category?category=d972c8f8-1cf3-431b-b3c5-4c4d1d77110d&page=1&limit=10`

_category_: UUID de la categoría.

_limit_: Máximo de pins a mostrar por carga ejecutada.

_page_: Página actual en la cual se encuentra el usuario (min 1)

[RESPONSE]

```json
{
  "pins": [
    {
      "body": "String",
      "title": "String?",
      "url": "String?",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String"
    }
  ],
  "results": "Number"
}
```

### Autocomplete suggestions

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/search/suggestions`

[RESPONSE]

```json
{
  "suggestions": [
    {
      "title": "String?",
      "alt_text": "String"
    },
    {
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String?",
      "verified": "Boolean",
      "avatar_background": "String",
      "avatar_letter": "String",
      "avatar_letter_color": "String"
    }
  ]
}
```

### Get previous pins

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/previous-pins`

[RESPONSE]

```json
{
  "pins": {
    "data": [
      {
        "body": "String",
        "title": "String?",
        "id": "String<UUID>",
        "created_at": "String<Date>"
      }
    ],
    "results": "Number"
  }
}
```

### Get previous pins full data

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/previous-pins/:id`

_id_: UUID

[RESPONSE]

```json
{
  "pin": {
    "id": "String<UUID>",
    "alt_text": "String",
    "title": "String?",
    "body": "String",
    "topics": "String<UUID>[]?",
    "description": "String?",
    "url": "String<URL>?",
    "adult_content": "Boolean"
  }
}
```

### Get created pins

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/created/:username?page=Number&limit=Number`

_username_: User username

[RESPONSE]

```json
{
  "pins": [
    {
      "id": "String<UUID>",
      "alt_text": "String",
      "title": "String?",
      "body": "String",
      "url": "String<URL>?",
      "adult_content": "Boolean",
      "its_yours": "Boolean?",
      "created_at": "String<Date>"
    }
  ]
}
```

## Categories

### Search all

_*GET*_ `http://localhost:1234/pinterest-clon-api/categories/`

[Response]

```json
{
  "categories": [
    {
      "name": "String",
      "id": "String",
      "poster": "String"
    },
    {
      "name": "String",
      "id": "String",
      "poster": "String"
    }
  ]
}
```

### Search by name

_*GET*_ `http://localhost:1234/pinterest-clon-api/categories/search?value=an`

_value_: Search input value

[Response]

```json
{
  "categories": [
    {
      "name": "String",
      "id": "String<UUID>",
      "poster": "String<URL>"
    },
    {
      "name": "String",
      "id": "String<UUID>",
      "poster": "String<URL>"
    }
  ],
  "results": "Number"
}
```

### Search by ID

_*GET*_ `http://localhost:1234/pinterest-clon-api/categories/:id`

_EJEMPLO:_ `http://localhost:1234/pinterest-clon-api/categories/d972c8f8-1cf3-431b-b3c5-4c4d1d77110d`

_:id_: UUID

[Response]

```json
{
  "category": {
    "name": "String",
    "id": "String",
    "poster": "String"
  }
}
```

## Rooms (PRÓXIMAMENTE)

## User

### Follow/Unfollow user

_*POST*_ `http://localhost:1234/pinterest-clon-api/users/follow/:id`

[RESPONSE]

```json
{
  "message": "String"
}
```

### Get user profile

_*GET*_ `http://localhost:1234/pinterest-clon-api/users/profile/:username`

[RESPONSE (logged)]

```json
{
  "user": {
    "id": "String",
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "verified": "Boolean",
    "avatar": "String?",
    "avatar_background": "String",
    "avatar_letter_color": "String",
    "avatar_letter": "String",
    "about": "String?",
    "website": "String?",
    "private_account": "Boolean",
    "followers_count": "Number",
    "following_count": "Number",
    "follows_you": "Boolean",
    "following": "Boolean",
    "its_you": "Boolean"
  }
}
```

[RESPONSE (not logged)]

```json
{
  "user": {
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "verified": "Boolean",
    "avatar": "String?",
    "avatar_background": "String",
    "avatar_letter_color": "String",
    "avatar_letter": "String",
    "about": "String?",
    "website": "String?",
    "private_account": "Boolean",
    "followers_count": "Number",
    "following_count": "Number"
  }
}
```

### Get user owner profile

_*GET*_ `http://localhost:1234/pinterest-clon-api/users/profile`

[RESPONSE]

```json
{
  "user": {
    "username": "String",
    "name": "String?",
    "surname": "String?",
    "verified": "Boolean",
    "avatar": "String?",
    "avatar_background": "String",
    "avatar_letter_color": "String",
    "avatar_letter": "String",
    "about": "String?",
    "website": "String?",
    "private_account": "Boolean",
    "followers_count": "Number",
    "following_count": "Number"
  }
}
```

### Follow/Unfollow user

_*POST*_ `http://localhost:1234/pinterest-clon-api/users/follow/:id`

[RESPONSE]

```json
{
  "message": "String"
}
```

### Followers list

_*GET*_ `http://localhost:1234/pinterest-clon-api/users/followers-list/:username`

[RESPONSE (logged)]

```json
{
  "followers": [
    {
      "id": "String",
      "username": "String",
      "name": "String?",
      "surname": "String?",
      "verified": "Boolean",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String",
      "its_you": "Boolean",
      "follows_you": "Boolean",
      "following": "Boolean"
    }
  ],
  "followersCount": "Number"
}
```

[RESPONSE (not logged)]

```json
{
  "followers": [
    {
      "username": "String",
      "name": "String?",
      "surname": "String?",
      "verified": "Boolean",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String"
    }
  ],
  "followersCount": "Number"
}
```

### Following account list

_*GET*_ `http://localhost:1234/pinterest-clon-api/users/following-list/:username`

[RESPONSE (logged)]

```json
{
  "following": [
    {
      "id": "String",
      "username": "String",
      "name": "String?",
      "surname": "String?",
      "verified": "Boolean",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String",
      "its_you": "Boolean",
      "follows_you": "Boolean",
      "following": "Boolean"
    }
  ],
  "followingCount": "Number"
}
```

[RESPONSE (not logged)]

```json
{
  "following": [
    {
      "username": "String",
      "name": "String?",
      "surname": "String?",
      "verified": "Boolean",
      "avatar": "String?",
      "avatar_background": "String",
      "avatar_letter_color": "String",
      "avatar_letter": "String"
    }
  ],
  "followingCount": "Number"
}
```

## Boards

### Search boards

_*POST*_ `http://localhost:1234/pinterest-clon-api/boards/search?value=String&page=Number&limit=Number`

[RESPONSE]

```json
{
  "boards": [
    {
      "id": "String<UUID>",
      "name": "String",
      "created_at": "String<Date>",
      "pins_count": "String<Number>",
      "cover": "String<URL>?",
      "collage": "String<URL>[]",
      "user": {
        "name": "String?",
        "surname": "String?",
        "username": "String",
        "id": "String<UUID>",
        "avatar": "String<URL>?",
        "avatar_letter_color": "String<Hex>",
        "avatar_letter": "String<Char>",
        "avatar_background": "String<Hex>",
        "verified": "Boolean"
      }
    }
  ],
  "results": "Number"
}
```

_*Description*_: Permite buscar boards

### Home boards

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards?page=Number&limit=Number`

[RESPONSE]

```json
{
  "boards": [
    {
      "id": "String<UUID>",
      "name": "String",
      "created_at": "String<Date>",
      "pins_count": "String<Number>",
      "cover": "String<URL>?",
      "collage": "String<URL>[]",
      "user": {
        "name": "String?",
        "surname": "String?",
        "username": "String",
        "id": "String<UUID>",
        "avatar": "String<URL>?",
        "avatar_letter_color": "String<Hex>",
        "avatar_letter": "String<Char>",
        "avatar_background": "String<Hex>",
        "verified": "Boolean"
      }
    }
  ],
  "results": "Number"
}
```

_*Description*_: Trae todos los boards disponibles

### Get possible covers

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/covers/:id?page=Number&limit=Number`

_id_: ID del tablero

[RESPONSE]

```json
{
  "pins": [
    {
      "id": "String<UUID>",
      "body": "String<URL>"
    }
  ],
  "results": "Number"
}
```

_*Description*_: Trae los pins que tiene guardado cierto board para poder usar su body como cover; Este se usa en la edición de boards cuando tocas el botón de cover.

### Get last board name

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/last-board`

[RESPONSE]

```json
{
  "board": "String"
}
```

_*Description*_: Trae el nombre del último board usado por el usuario, es decir, en el último que uso para añadir un pin; Esta función aparece al hacerle hover a un pin.

### Get single board

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/:id?page=Number&limit=Number`

_id_: ID del tablero

[RESPONSE]

```json
{
  "id": "String<UUID>",
  "name": "String",
  "description": "String?",
  "its_yours": "Boolean?",
  "following": "Boolean?",
  "pins_count": "String<Number>",
  "user": {
    "id": "String<UUID>",
    "name": "String?",
    "surname": "String?",
    "username": "String",
    "avatar": "String<URL>",
    "avatar_letter": "String<Char>",
    "avatar_letter_color": "String<Hex>",
    "avatar_background": "String<Hex>"
  },
  "pins": [
    {
      "body": "String<URL>",
      "title": "String?",
      "url": "String<URL>",
      "adult_content": "Boolean",
      "pin_id": "String<UUID>",
      "alt_text": "String",
      "name": "String?",
      "surname": "String?",
      "username": "String",
      "avatar": "String<URL>",
      "avatar_background": "String<Hex>",
      "avatar_letter_color": "String<Hex>",
      "avatar_letter": "String<Char>"
    }
  ]
}
```

_*Description*_: Trae los datos de un board en específico junto con los pins que contiene.

### Get user boards

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/:username?page=Number&limit=Number`

_username_: Username del usuario

```json
{
  "boards": [
    {
      "id": "String<UUID>",
      "name": "String",
      "created_at": "String<Date>",
      "pins_count": "String<Number>",
      "its_yours": "Boolean?",
      "cover": "String?",
      "collage": "String<URL>[]?"
    }
  ]
}
```

_*Description*_: Trae los datos para hacer una preview de los boards que tiene creados un usuario especifico al entrar a su perfil.

### Boards list

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/boards-list`

[RESPONSE]

```json
{
  "boards": [
    {
      "name": "String",
      "id": "String<UUID>",
      "cover": "String?",
      "collage": "String<URL>[]?"
    }
  ]
}
```

_*Description*_: Carga la lista de boards creados por el usuario dueño de la cuenta, lo sirve para que el mismo pueda agregar un pin a cierto board de su preferencia; Esta función aparece a la hora de tocar el botón de arriba a la izquierda de un pin cuando se le esta haciendo hover.

### Create board

_*POST*_ `http://localhost:1234/pinterest-clon-api/boards/create`

[BODY]

```json
{
  "name": "String",
  "description": "String?",
  "pinId": "String<UUID>?"
}
```

_*Description*_: Permite crear un board.

### Edit board

_*PUT*_ `http://localhost:1234/pinterest-clon-api/boards/edit`

[BODY]

```json
{
  "id": "String<UUID>",
  "name": "String",
  "description": "String?",
  "cover": "String<URL>?"
}
```

_*Description*_: Permite editar un board.

### Delete board

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/boards/:id`

[RESPONSE]

```json
{
  "message": "String"
}
```

_*Description*_: Permite eliminar un board.

### Add pin to board

_*POST*_ `http://localhost:1234/pinterest-clon-api/boards/add-pin`

[BODY]

```json
{
  "pinId": "String<UUID>",
  "boardId": "String<UUID>"
}
```

_*Description*_: Permite agregar un pin a un board deseado.

### Remove pin to board

_*POST*_ `http://localhost:1234/pinterest-clon-api/boards/remove-pin`

[BODY]

```json
{
  "pinId": "String<UUID>",
  "boardId": "String<UUID>"
}
```

_*Description*_: Elimina un pin de un board en especifico.

## Comments

### Create comment

_*POST*_ `http://localhost:1234/pinterest-clon-api/comments/create`

[BODY]

```json
{
  "id": "String<UUID>",
  "content": "String"
}
```

_NOTA_: Donde dice "id", va el ID del pin.

_*Description*_: Crea un comentario en cierto pin especificado.

### Delete comment

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/comments/:id`

[RESPONSE]

```json
{
  "message": "String"
}
```

_*Description*_: Elimina un comentario.

### Toggle like comment

_*POST*_ `http://localhost:1234/pinterest-clon-api/comments/toggle-like`

[BODY]

```json
{
  "id": "String<UUID>"
}
```

_*Description*_: Permite darle like a un comentario ya también sacarlo.

### Get pin comments

_*GET*_ `http://localhost:1234/pinterest-clon-api/boards/pin-comments/:id`

_id_: Pin ID

```json
{
  "comments": [
    {
      "id": "String<UUID>",
      "content": "String",
      "created_at": "String<Date>",
      "likes_count": "Number",
      "already_liked": "Boolean",
      "its_yours": "Boolean",
      "user": {
        "id": "String<UUID>",
        "name": "String?",
        "surname": "String?",
        "username": "String",
        "avatar": "String<URL>?",
        "avatar_letter": "String<Char>",
        "avatar_letter_color": "String<Hex>",
        "avatar_background": "String<Hex>"
      }
    }
  ],
  "results": "Number"
}
```

_*Description*_: Trae los comentarios de un pin en especifico.
