# DOCUMENTACIÓN API

## Auth

### Register

_*POST*_ `http://localhost:1234/pinterest-clon-api/auth/register`

[Body:]

```json
{
  "emailAddress": "nuevotest@gmail.com",
  "password": "uSer@esdst2",
  "username": "PinterestClon123324",
  "birthdate": "2006-02-20",
  "genderId": "af1f070d-77d9-48c4-93e0-e193d7a19309",
  "countryId": "58c5e3d5-0e5f-4b53-9cf8-c122399b97b9",
  "langId": "a2071c45-12e1-4c10-b240-4141b1cdc2bc",
  "avatarBackground": "#f05227",
  "avatarLetterColor": "#ffffff",
  "avatarLetter": "N",
  "avatar": file
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
  "emailAddress": "usertes234545232@gmail.com",
  "password": "uSer@esdst2"
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
  "emailAddress": "agustingil83@gmail.com"
}
```

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Reset password

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/auth/reset-password/agustingil83@gmail.com`

[Body:]

```json
{
  "password": "Hol@Buenas1234"
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

_*GET*_ `http://localhost:1234/pinterest-clon-api/countries/45f5c4b9-b702-432c-8cd7-db2146a7f05c`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

## Genders

### Get genders

_*GET*_ `http://localhost:1234/pinterest-clon-api/genders`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Get genders by ID (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*GET*_ `http://localhost:1234/pinterest-clon-api/genders/af1f070d-77d9-48c4-93e0-e193d7a19309`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 404 (NOT FOUND)

## Languages

### Get languages

_*GET*_ `http://localhost:1234/pinterest-clon-api/languages`

[Response:] Mensaje de éxito y status 200 (OK)

[Error:] Mensaje de error y status 400 (BAD REQUEST)

### Get languages by ID (SE REQUIERE AUTENTIFICACIÓN PREVIA)

_*GET*_ `http://localhost:1234/pinterest-clon-api/languages/b3dcac23-7006-489b-a9c1-8120a4b4346c`

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
    "username": "PinterestCldadon123324",
    "avatar_background": "#f05227",
    "avatar_letter_color": "#ffffff",
    "avatar_letter": "N",
    "name": "Hola",
    "surname": "Mundo"
  }
}
```

#### Edit user data

_*PUT*_ `http://localhost:1234/pinterest-clon-api/settings/edit-profile`

[BODY]

Todos son valores opcionales:

```json
{
  "username": "MiNuevo@migo123",
  "name": "Pablo",
  "surname": "Dominguez",
  "about": "Hello World",
  "website": "https://helloWorld.com"
}
```

#### Get user data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/edit-profile`

[RESPONSE]

```json
{
  "userData": {
    "username": "PinterestCldadon123324",
    "avatar_background": "#f05227",
    "avatar_letter_color": "#ffffff",
    "avatar_letter": "N",
    "name": "Hola",
    "surname": "Mundo"
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
    "account_type": "Business",
    "private_account": false
  }
}
```

#### Convert account

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/profile-visibility/convert-account`

[RESPONSE]

```json
{
  "message": ""
}
```

#### Private account

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/profile-visibility/private-account`

[RESPONSE]

```json
{
  "message": ""
}
```

### Security

#### Get data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/account-security`

[RESPONSE]

```json
{
  "userData": {
    "two_factor_authentication": false
  }
}
```

#### Toggle 2fa

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/account-security/2fa`

[RESPONSE]

```json
{
  "message": ""
}
```

### Account management

#### Delete account

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/delete-account`

[RESPONSE]

```json
{
  "message": ""
}
```

#### Get user data

_*GET*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/`

[RESPONSE]

```json
{
  "userData": {
    "email_address": "nuevotes32t@gmail.com",
    "birthdate": "2006-02-20T03:00:00.000Z",
    "gender": "Male",
    "country": "Argentina",
    "language": "Spanish",
    "account_type": "Business"
  }
}
```

#### Edit personal info

_*PUT*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/personal-info`

[BODY]

Todos son valores opcionales:

```json
{
  "gender": "UUID",
  "country": "UUID",
  "language": "UUID",
  "emailAddress": "miemail23@gmail.com",
  "birthdate": "2006-02-20"
}
```

#### Change password

_*PATCH*_ `http://localhost:1234/pinterest-clon-api/settings/account-management/change-password`

[BODY]

```json
{
  "prevPassword": "uSer@esdst2",
  "newPassword": "helloWorld12@"
}
```

## Avatar

### Delete avatar

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/avatar`

[RESPONSE]

```json
{
  "message": "User avatar successfully deleted!"
}
```

### New avatar

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/avatar`

[Body]

```json
{
  "avatar": file
}
```

(HEADERS): `"Content-type": "multipart/form-data"`

## Posts

### Home pins

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins?page=1&limit=10`

_limit_: Máximo de pins a mostrar por carga ejecutada.

_page_: Página actual en la cual se encuentra el usuario (min 0)

[Response]

```json
{
  {
  "pins": [
    {
      "body": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874315/pinterest-clon/hupwbbc6o2lgtrh80wnz.png",
      "title": "Me encanta",
      "url": "",
      "adult_content": false,
      "pin_id": "c0898a7c-83be-4db2-864a-daa1c0f74ad7",
      "alt_text": "Pajaros cantan",
      "name": null,
      "surname": null,
      "username": "PinterestCldadon123324",
      "avatar": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874164/pinterest-clon/k62w54pol1dkdxhh8tsj.png",
      "avatar_background": "#f05227",
      "avatar_letter_color": "#ffffff",
      "avatar_letter": "N"
    },
    {
      "body": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874181/pinterest-clon/bvvjc3tltrd7oyaa2sjg.png",
      "title": "Este es muy nuevo",
      "url": "",
      "adult_content": true,
      "pin_id": "e1d7cff3-4c59-480c-94ba-29d39b2e1992",
      "alt_text": "Imagen anananananashe",
      "name": null,
      "surname": null,
      "username": "PinterestCldadon123324",
      "avatar": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874164/pinterest-clon/k62w54pol1dkdxhh8tsj.png",
      "avatar_background": "#f05227",
      "avatar_letter_color": "#ffffff",
      "avatar_letter": "N"
    }
  ],
  "results": 2
}
}
```

### Create pin

_*POST*_ `http://localhost:1234/pinterest-clon-api/pins/create`

[Body] (formData)

```json
{
  "title": "String",
  "adultContent": "Boolean",
  "altText": "String",
  "description": "String",
  "topics": "String []",
  "url": "String",
  "body": "File"
}
```

### Get pin

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[Response]

```json
{
  "pin": {
    "pin_id": "e1d7cff3-4c59-480c-94ba-29d39b2e1992",
    "body": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874181/pinterest-clon/bvvjc3tltrd7oyaa2sjg.png",
    "title": "Este es muy nuevo",
    "description": "Buenas tardes señor",
    "url": "",
    "created_at": "2024-08-28T03:00:00.000Z",
    "topics": [],
    "alt_text": "Imagen anananananashe",
    "likes": "0",
    "name": null,
    "surname": null,
    "avatar": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874164/pinterest-clon/k62w54pol1dkdxhh8tsj.png",
    "avatar_background": "#f05227",
    "avatar_letter_color": "#ffffff",
    "avatar_letter": "N",
    "user_id": "6a719e16-5347-4e2e-8177-9399aa6858fd",
    "followers": "0"
  }
}
```

### Delete pin

_*DELETE*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[Response]

```json
{
  "message": "Success"
}
```

### Edit pin

_*PUT*_ `http://localhost:1234/pinterest-clon-api/pins/:id`

_:id_ => UUID Pin

[Body]

```json
{
  "title": "String",
  "adultContent": "Boolean",
  "altText": "String",
  "description": "String",
  "url": "String",
  "body": "File"
}
```

### Search

_*GET*_ `http://localhost:1234/pinterest-clon-api/pins/search?value=h&page=1&limit=10`

_value_: Search input value

_limit_: Máximo de pins a mostrar por carga ejecutada.

_page_: Página actual en la cual se encuentra el usuario (min 0)

[Response]

```json
{
  "pins": [
    {
      "body": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874181/pinterest-clon/bvvjc3tltrd7oyaa2sjg.png",
      "title": "Este es muy nuevo",
      "url": "",
      "adult_content": true,
      "pin_id": "e1d7cff3-4c59-480c-94ba-29d39b2e1992",
      "alt_text": "Imagen anananananashe",
      "name": null,
      "surname": null,
      "username": "PinterestCldadon123324",
      "avatar": "https://res.cloudinary.com/dui9yfpp1/image/upload/v1724874164/pinterest-clon/k62w54pol1dkdxhh8tsj.png",
      "avatar_background": "#f05227",
      "avatar_letter_color": "#ffffff",
      "avatar_letter": "N"
    }
  ],
  "results": 1
}
```

_NOTA_ El buscador toma como parámetros de búsqueda
el title y el alt_text

### Search by Category

Ya esta terminado pero todavía tengo que definir algunos detalles, pero la url esta activada, pero no la uses.

## Categories

### Search all

_*GET*_ `http://localhost:1234/pinterest-clon-api/categories/`

[Response]

```json
{
  "categories": [
    {
      "name": "Animals",
      "id": "5b85db6e-3f72-464d-af57-776888d57919",
      "poster": "https://image-url.com"
    },
    {
      "name": "Anime",
      "id": "4ce6fbe1-0862-4054-b0b1-17ab2aed2079",
      "poster": "https://image-url.com"
    },
    ...
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
      "name": "Animals",
      "id": "5b85db6e-3f72-464d-af57-776888d57919",
      "poster": "R"
    },
    {
      "name": "Anime",
      "id": "4ce6fbe1-0862-4054-b0b1-17ab2aed2079",
      "poster": "https://image-url.com"
    }
  ],
  "results": 2
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
    "name": "Sports",
    "id": "d972c8f8-1cf3-431b-b3c5-4c4d1d77110d",
    "poster": "https://image-url.com"
  }
}
```

## Rooms (PRÓXIMAMENTE)

## User interactions (PRÓXIMAMENTE)
