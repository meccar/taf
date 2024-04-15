available API


======================================================================


POST REQUEST:

api/v1/contact                        ||              input [ name, email, phone, message ]

api/v1/users/register                 ||              input [ username, email, password, passwordConfirm ]

api/v1/users/login                    ||              input [ username, email, password ]

api/v1/users/forgotPassword           ||              input [ username, email ]

api/v1/post                           ||              input [ title, text, picture, communityName ]

api/v1/community                      ||              input [ name, description, picture ]

api/v1/comment                        ||              input [ text ]
    
api/v1/reply                          ||              input [ text ]

api/v1/rule                           ||              input [ title, description ]

api/v1/vote                           ||              input [ post_id, user_id, value ]

*value = [ 1, -1 ]

======================================================================


GET REQUEST:


api/v1/verifymail/:email/:secret_code

api/v1/post

api/v1/post/:id

api/v1/community

api/v1/users/logout


======================================================================


PATCH REQUEST:


api/v1/post/:id                    ||          input [ title, text, picture, upvotes, communityName ]

api/v1/users/resetPassword/:token  ||          input [ token, password, passwordConfirm ]

how to get token?

request /forgotPassword then check email


updatePassword
api/v1/users/updatePassword        ||          input [ user_id, passwordCurrent, password, passwordConfirm ]

api/v1/users/updateAccount         ||          input [ username, email ]


======================================================================


DELETE REQUEST:


api/v1/post/:id

api/v1/users/deleteAccount  ||          input [ user_id ]


======================================================================


FILTER REQUEST:


< 1 > api/v1/post?OBJECT[METHOD]=NUMBER

OBJECT = [ upvotes ]

METHOD = [ gte, gt, lte, lt ]

*gte    :   greater than or equal to

*gt     :   greater than

*lte    :   less than or equal to

*lt     :   less than




< 2 > api/v1/post?OBJECT=CONTENT

OBJECT = [ title ]

CONTENT = OBJECT's data





