const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../services/ClientsServices');
const usuario = new User;

const bcrypt = require('bcrypt');

const tokens = require('./tokens');

async function checkSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new Error('Usuario ou senha incorretos');
    }
}

passport.use(
    new LocalStrategy({
        usernameField: 'user',
        passwordField: 'password',
        session: false
    }, async (user, password, done) => {
        try {
            const data = await usuario.getOneClientWithUser(user);
            await checkSenha(password, data.password);
            done(null, data);
        } catch (error) {
            done(error);
        }
    }
    )
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try {
                const id = await tokens.access.check(token);
                const user = await usuario.getOneRecord(id);
                done(null, user, { token: token});
            } catch (error) {
                done(error);
            }
        }
    )
)