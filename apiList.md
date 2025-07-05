# DEVTINDER APIs

# authRouter
- POST /signup 
- POST /login
- POST /logout

# profileRouter
- GET /profile/view 
- PATCH /profile/edit
- PATCH /profile/password

# connectionRequestRouter
- POST /request/send/:status/:userId
status - interested or rejected

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

# userRouter
- GET  /user/connections
- GET /user/requests/received
- GET /user/feed


# Status- ignore/interested/accepted/rejected

