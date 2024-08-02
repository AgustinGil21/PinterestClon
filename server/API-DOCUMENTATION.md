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
  "avatarLetter": "N"
}
```

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

## Posts (PRÓXIMAMENTE)

## Rooms (PRÓXIMAMENTE)

## User interactions (PRÓXIMAMENTE)
