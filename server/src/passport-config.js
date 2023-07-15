const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            console.log('No user with that username')
            return done(null, false, { message: 'No user with that username' })
        }
        try {
            let hashedPassword = crypto.createHash('md5').update(password).digest('hex');
            if (hashedPassword === user.password) {
                return done(null, user)
            }
            else {
                console.log('Password incorrect')
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'username' },
        authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })

}


module.exports = initialize