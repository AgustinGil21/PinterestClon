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

## Posts (PRÓXIMAMENTE)

## Rooms (PRÓXIMAMENTE)

## User interactions (PRÓXIMAMENTE)
