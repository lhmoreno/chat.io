import { Request, Response } from 'express'

export const userController = {
  async show(req: Request, res: Response) {
    // const token = req.headers.authorization

    return res.status(200).json({ name: 'lhmoreno' })
  }
}
