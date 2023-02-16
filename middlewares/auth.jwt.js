import jwt from 'jsonwebtoken'
import user from '../models/user.js'

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return res.status(403).json({ message: 'No token provided' })

    const decoded = jwt.verify(token, process.env.SECRET)

    req.userId = decoded.id

    const newUser = await user.findById(decoded.id, { password: 0 })

    if (!newUser) return res.status(404).json({ message: 'no user found' })

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
