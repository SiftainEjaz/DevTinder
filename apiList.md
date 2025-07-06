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
status - interested or ignored

- POST /request/review/:status/:requestId
status - rejected or accepted

# userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed


# Status- ignore/interested/accepted/rejected

