available API


======================================================================


POST REQUEST:

api/v1/contact                  ||              input [ name, email, phone, message ]

api/v1/register                 ||              input [ username, email, password ]

api/v1/login                    ||              input [ username, email, password ]

api/v1/post                     ||              input [ title, text, picture, communityName ]

api/v1/community                ||              input [ name, description, picture ]

api/v1/comment                  ||              input [ text ]

api/v1/reply                    ||              input [ text ]

api/v1/rule                     ||              input [ title, description ]


======================================================================


GET REQUEST:


api/v1/verifymail/:email/:secret_code

api/v1/post/:id

api/v1/post

api/v1/logout


======================================================================
