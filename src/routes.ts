import path from "path"
import { v4 } from "uuid"
import { NextFunction, Request, Response, Router } from "express"

import { config } from "./config"
import { db } from "./database"

interface MyRequest extends Request {
  user_id?: string
  name?: string
}

const routes = Router()

// Login Page
routes.get("/", auth, (req: MyRequest, res) => {
  const user_id = req?.user_id
  const name = req?.name

  if (user_id && !name) {
    const { name } = db.users[user_id]
    
    return res.redirect(`/?name=${name}`)
  }
    
  return res.sendFile(path.join(config.path_public, "login", "index.html"))
})

// Chat Page
routes.get("/chat", auth, (req: MyRequest, res) => {
  const user_id = req?.user_id
  const name = req?.name

  if (!user_id && !name) return res.redirect("/")

  if (!user_id && name) {
    const id = v4()
    db.users[id] = { name }
    res.cookie("user_id", id)
    
    console.log("USERS:", db.users)
    return res.redirect("/chat")
  }

  if (user_id && name) {
    db.users[user_id] = { ...db.users[user_id], name }
    
    console.log("USERS:", db.users)
    return res.redirect("/chat")
  }

  return res.sendFile(path.join(config.path_public, "chat", "index.html"))
})

function auth(req: MyRequest, res: Response, next: NextFunction) {
  const user_id = req.cookies?.user_id
  const name = req.query?.name
  const id = Object.keys(db.users).find((id) => user_id === id)

  if (typeof(user_id) === "string") {
    id ? req.user_id = id : res.clearCookie("user_id")
  }

  if (typeof(name) === "string" && name.length <= 12) req.name = name

  return next()
}

export { routes }
