import path from "path"
import { v4 } from "uuid"
import { NextFunction, Request, Response, Router } from "express"

import { config } from "./config"
import { db } from "./database"

interface MyRequest extends Request {
  user_id?: string
}

const routes = Router()

// Login Page
routes.get("/", auth, (req: MyRequest, res) => {
  const user_id = req?.user_id
  const query_name = req.query?.name

  if (user_id && !query_name) {
    const { name } = db.users[user_id]
    
    return res.redirect(`/?name=${name}`)
  }
    
  return res.sendFile(path.join(config.path_public, "login", "index.html"))
})

// Chat Page
// routes.get("/chat", auth, (req: MyRequest, res) => {
//   const wasCreated = req?.wasCreated
//   console.log(wasCreated)

//   if (wasCreated) {
//     return res.redirect("/")
//   } else {
//     return res.sendFile(path.join(config.path_public, "chat", "index.html"))
//   }
// })

// Login Api
// routes.post("/api/login", (req, res) => {
//   const user_id: string | undefined = req.body?.user_id
//   if (typeof(user_id) !== "string") return res.status(400).json({ error: "user_id it's not string" })

//   const hasUserId = Object.keys(db.users).find((id) => user_id === id)

//   if (hasUserId) {
//     console.log("USERS:", db.users) // LOG

//     return res.status(200).json({ queue: "queue | undefined" })
//   } else {
//     const id = v4()
//     db.users[id] = ""
//     console.log("USERS:", db.users) // LOG

//     return res.status(201).json({ user_id: id })
//   }
// })

function auth(req: MyRequest, res: Response, next: NextFunction) {
  const user_id: string | undefined = req.cookies?.user_id
  const id = Object.keys(db.users).find((id) => user_id === id)

  if (id) req.user_id = id
  console.log("Auth")

  // {
  //   const id = v4()
  //   db.users[id] = {}
  //   res.cookie("user_id", id)

  //   console.log("USERS:", db.users) // LOG
  // }

  return next()
}

export { routes }
