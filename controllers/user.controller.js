import User from '../models/user.js'
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const login = async (req, res) => {
  try {
    // async function comparePassword (plaintextPassword, hash) {
    //   const result = await bcrypt.compare(plaintextPassword, hash)
    //   return result
    // }

    const userFound = await User.findOne({
      username: req.body.username
    })

    // if (!userFound) return res.status(400).json({ message: 'User not found' })
    // const matchPassword = await comparePassword(
    //   req.body.password,
    //   userFound.password
    // )

    // if (!matchPassword) {
    //   return res.status(401).json({ token: null, message: 'Invalid Password' })
    // }

    const token = jwt.sign(
      { id: userFound._id },
      process.env.SECRET,
      {
        expiresIn: 86400
      }
    )

    res.json({ user: userFound, token })
  } catch (error) {}
}

export const register = async (req, res) => {
  try {
    // async function hashing (plaintextPassword) {
    //   const hash = await bcrypt.hash(plaintextPassword, 10)
    //   return hash
    // }

    const { username, password, email, tel } = req.body

    const user = new User({
      username,
      password: /*await hashing */ (password),
      email,
      tel
    })

    const savedUser = await user.save((err) => {
      if (err) {
        res
          .status(404)
          .json({ status: 404, message: 'Could not create the user' })
      }

      if (!err) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 86400 // 1 day
        })
        res.status(201).json({
          status: 201,
          message: 'User created successfully',
          token
        })
      }
    })
  } catch (error) {
    res.json({ error, message: 'Error Request' })
  }
}

export const token = async (req, res) => {
  const { token } = req.body

  if (!token) return res.status(400).json({ message: 'token no provided' })

  const decoded = jwt.verify(token, process.env.SECRET)

  const newUser = await User.findById(decoded.id)

  if (!newUser) return res.status(404).json({ message: 'no user found' })

  return res.status(200).json({ user: newUser })
}
