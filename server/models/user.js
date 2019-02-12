const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  password: {
    type: String,
    min: [8, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required'
  },
  rentals: [{
    type: Schema.Types.ObjectId, ref: 'Rental'
  }]
})

userSchema.methods.hasSamePassword = async function(requestedPassword){
  const match = await bcrypt.compare(requestedPassword, this.password)
  return match
}

userSchema.pre('save', function(next) {
  const user = this

  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password = hash
    console.log(user.password)
    next()
  });
})

module.exports = mongoose.model('User', userSchema)
