# REST API Contacts Application (NodeJS, Express, MongoDB)

This is a bare-bones example of a contacts application providing a REST
API to a MongoDB-backed model.

- [How To Install App](#install)
- [REST API](#rest-api)
- [Contacts Routes](#contacts)
  - [List of contacts](#get-list-of-contacts)
  - [Contact by Id](#get-contact-by-id)
  - [Create](#create-contact)
  - [Update](#update-contact)
  - [Update favorite field](#update-contact-favorite-field)
  - [Delete](#delete-contact)
- [Query Params For Contacts Routes](#query-params-for-contacts-list)
- [Users Routes](#users)
  - [Registration](#user-registration)
  - [Login](#user-login)
  - [Verification](#user-verification)
  - [Re-verification](#user-re-verification)
  - [Logout](#user-logout)
  - [Current user](#get-current-user)
  - [Update Subscription](#update-user-subscription)
  - [Update Avatar](#update-user-avatar)

## Install

    npm install

## Run the app in production mode

    npm start

## Run the app in development mode

    npm run start:dev

## Run the linter

    npm run lint

## Run the linter in fix mode

    npm run lint:fix

# REST API

The REST API to the example app is described below.

# Contacts

## Get list of contacts

### Request

`GET /api/contacts/`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Status: success
    Content-Type: application/json

    Body: "contacts": []

## Get contact by id

### Request

`GET /api/contacts/:id`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Status: success
    Content-Type: application/json

    Body: "contact": { "favorite": boolean, "_id": string, "name": string, "email": string, "phone": string, "owner": object }

## Create contact

### Request

`POST /api/contacts/`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

    Body: { "name": string, "email": string, "phone": string }

### Response

    HTTP/1.1 201 OK
    Status: success
    Content-Type: application/json

    Body: "contact": { "favorite": boolean, "_id": string, "name": string, "email": string, "phone": string, "owner": object, "__v": number }

## Update contact

### Request

`PATCH /api/contacts/:id`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

    Body: { "favorite": boolean, "name": string, "email": string, "phone": string }

### Response

    HTTP/1.1 200 OK
    Status: success
    Content-Type: application/json

    Body: "contact": { "favorite": boolean, "_id": string, "name": string, "email": string, "phone": string, "owner": object }

## Update contact favorite field

### Request

`PATCH /api/contacts/:id/favorite`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

    Body: { "favorite": boolean }

### Response

    HTTP/1.1 200 OK
    Status: success
    Content-Type: application/json

    Body: "contact": { "favorite": boolean, "_id": string, "name": string, "email": string, "phone": string, "owner": object }

## Delete contact

### Request

`DELETE /api/contacts/:id`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Status: contact deleted
    Content-Type: application/json

# Query params for contacts list

### Requests

`GET /api/contacts?page=1`

`GET /api/contacts?limit=20`

`GET /api/contacts?favorite=true`

`GET /api/contacts?sortBy=name`

`GET /api/contacts?sortByDesc=name`

`GET /api/contacts?filter=email`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

# Users

## User Registration

### Request

`POST /api/users/signup`

    HTTP/1.1
    Host: localhost:7070

    Body: { "email": string, "subscription": string }

### Response

    HTTP/1.1 201 Created
    Content-Type: application/json

    Body: { "user": { "email": string, "subscription": string } }

## User Login

### Request

`POST /api/users/login`

    HTTP/1.1
    Host: localhost:7070

    Body: { "email": string, "subscription": string }

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    Body: { "token": string, "user": { "email": string, "subscription": string } }

## User Verification

### Request

`GET /api/users/verify/:verificationToken`

    HTTP/1.1
    Host: localhost:7070

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    Body: { "message": "Verification successful" }

## User Re-verification

### Request

`POST /api/users/verify`

    HTTP/1.1
    Content-Type: application/json
    Host: localhost:7070

    Body: { "email": string }

### Response

    HTTP/1.1 200 OK
    Status: 200 OK
    Content-Type: application/json

    Body: { "message": "Verification successful" }

## User Logout

### Request

`POST /api/users/logout`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 204 No Content

## Get Current User

### Request

`GET /api/users/current`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json

    Body: { "email": string, "subscription": string }

## Update User Subscription

### Request

`PATCH /api/users/subscription`

    HTTP/1.1
    Host: localhost:7070
    Authorization: Bearer

    Body: { "subscription": ['starter', 'pro', 'business'], }

### Response

    HTTP/1.1 200 OK
    Status: updated
    Content-Type: application/json

    Body: { "user": { "email": string, "subscription": string } }

## Update User Avatar

### Request

`PATCH /api/users/avatars`

    HTTP/1.1
    Host: localhost:7070
    Content-Type: multipart/form-data
    Authorization: Bearer

    Body: { "avatar": image }

### Response

    HTTP/1.1 200 OK
    Status: updated
    Content-Type: application/json

    Body: { "avatarURL": string }
