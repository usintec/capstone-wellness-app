import App, { port, server } from './App';
import Logger from './core/Logger';

server
  .listen(App.get('port'), () => { 
    console.log('App listening on port ' + port);
  })
  .on('error', e => Logger.error(e));
