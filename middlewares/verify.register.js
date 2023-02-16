import User from '../models/user.js'

export const VerifyRegister = async (req, res, next) => {
  const { username, password, email, tel } = req.body

  const userDuplicate = await User.findOne({ username })

  if (userDuplicate) return res.status(400).json({ message: 'The user already exists' })

  const emailDuplicate = await User.findOne({ email })

  if (emailDuplicate) return res.status(400).json({ message: 'The email already exists' })

  const telDuplicate = await User.findOne({ tel })

  if (telDuplicate) return res.status(400).json({ message: 'The tel already exists' })

  if (username.length <= 4) {
    return res.status(400).json({ message: 'The username is invalid' })
  }

  if (password.length <= 6) {
    return res.status(400).json({ message: 'The password is invalid' })
  }

  if (email.length <= 9) {
    return res.status(400).json({ message: 'The email is invalid' })
  }

  if (tel.length <= 7) {
    return res.status(400).json({ message: 'The tel is invalid' })
  }

  next()
}

export const VerifyLogin = async (req, res, next) => {
  const { username, password } = req.body

  const userDuplicate = await User.findOne({ username })

  if (!userDuplicate) return res.status(400).json({ message: 'The user no exists' })

  if (username.length <= 4) {
    return res.status(400).json({ message: 'The username is invalid' })
  }

  if (password.length <= 6) {
    return res.status(400).json({ message: 'The password is invalid' })
  }

  next()
}
