/** @format */

import { Service } from './service.mjs';
import { comparePassword } from '../../utils/hash.util.mjs';
import { userService } from './user.service.mjs';
import passport from 'passport';
import local from 'passport-local';

class AuthService extends Service {
    constructor(passport, strategy) {
        super();
        this.passport = passport;
        this.strategy = strategy;

        this.init();
    }
    init() {
        this.passport.use(new this.strategy({ usernameField: 'email' }, this.authenticateUser));
        this.passport.serializeUser((user, done) => done(null, user._id));
        this.passport.deserializeUser((id, done) => done(null, userService.getUserById({ id })));
    }
    session() {
        return this.passport.session();
    }
    initialize() {
        return this.passport.initialize();
    }
    async authenticateUser(email, password, done) {
        const user = await userService.getUserByEmail({ email });
        if (user === null) return done(null, false, { result: 'No user with the given email was found.' });

        const matched = await comparePassword(password, user.password);
        if (!matched) return done(null, false, { result: 'Password incorrect' });

        return done(null, user);
    }
    isAuthenticated(req, res, next) {
        return req.isAuthenticated() ? next() : res.redirect('/admin');
    }
    isNotAuthenticated(req, res, next) {
        return req.isAuthenticated ? res.redirect('/dashboard') : next();
    }

    login() {
        return this.passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/admin',
        });
    }

    logout(req, res) {
        req.logOut();
        res.redirect('/admin');
    }
}

export const authService = new AuthService(passport, local.Strategy);
