import auth from 'basic-auth';
import config from '../config.js'

export const basicAuth = (req, res, next) => {
    const credentials = auth(req);

    if (!credentials || credentials.name !== config.basicAuth.username || credentials.pass !== config.basicAuth.password) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Access denied');
    }

    next();
};