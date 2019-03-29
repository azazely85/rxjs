import bcrypt from 'bcryptjs';
import User from '../models/User';
const fs = require('fs');
const jwt = require('jsonwebtoken');
import keys from '../config/keys';

export async function login(req, res) {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60*60*24});
      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).json({
        message: 'Wrong password'
      });
    }
    
  } else{
    res.status(404).json({
      message: 'User not found'
    });
  }
}

export async function register(req, res) {
  const candidate = await User.findOne({email: req.body.email});
  if (candidate) {
    res.status(409).json({
      message: 'Email exist'
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSunc(password, salt)
    });
    try {
      await user.save();
      res.status(201).json(user)
    } catch (e) {
    
    }
    
  }
  
}
