import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';

import { hooks, environments, positions, register } from 'universal-redux/lib/hooks';

export const config = {
  environments: environments.SERVER
};

register(hooks.CREATE_SERVER, ({ config, renderer }) => {
  const server = new Express();
  server.use(compression());
  if (config.favicon) {
    server.use(favicon(path.resolve(config.favicon)));
  }
  const maxAge = config.maxAge || 0;
  server.use(Express.static(path.resolve(config.staticPath), { maxage: maxAge }));
  server.use((req, res) => {
    renderer({ location: req.originalUrl, headers: req._headers })
      .then(({ status, body, redirect }) => {
        if(redirect){
          res.redirect(redirect);
        } else {
          res.status(status || 400).send(body);
        }
      })
  });
  return { server };
}, { environments: environments.SERVER });

register(hooks.START_SERVER, ({ config, server }) => {
    return new Promise(( resolve, reject ) => {
      server.listen(config.port, (err) => {
        err ? reject(err) : resolve({ server });
      });
    });
}, { environments: environments.SERVER });
