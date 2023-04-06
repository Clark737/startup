const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { WebSocketServer } = require('ws');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.userName)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.userName, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.userName);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:userName', async (req, res) => {
  const user = await DB.getUser(req.params.userName);
  if (user) {
    const token = req?.cookies.token;
    res.send({ userName: user.userName, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get Server
secureApiRouter.get('/server/:server', async (req, res) => {
  const scores = await DB.getAllImages();
  res.send(scores);
});

// Add image
secureApiRouter.post('/add', async (req, res) => {
  if (await DB.getImage(req.body.name)) {
    res.send();
  }
  else {
    await DB.addImage(req.body);
    res.send();
  }
});

// start image
secureApiRouter.post('/start', async (req, res) => {
  await DB.startImage(req.body);
  res.send();
});

// stop server
secureApiRouter.post('/stop', async (req, res) => {
  await DB.stopServer(req.body);
  res.send();
});

// delete image
secureApiRouter.delete('/deleteImg/:image', async (req, res) => {
  await DB.addScore(req.body);
  const scores = await DB.getAllImages();
  res.send(scores);
});

// get all images
secureApiRouter.get('/imageAll', async (req, res) => {
  const images = await DB.getAllImages();
  res.send(images);
});

// get all servers
secureApiRouter.get('/serverAll', async (req, res) => {
  const scores = await DB.getAllServers();
  res.send(scores);
});

// get all servers on host
secureApiRouter.get('/runningOn/:host', async (req, res) => {
  const scores = await DB.getAllImagesHost(req.params.host);
  res.send(scores);
});

// get cpu server
secureApiRouter.get('/cpuSrv/:host/:server', async (req, res) => {
  const scores = await DB.getAllImages();
  res.send(scores);
});

// get mem server
secureApiRouter.get('/memSrv/:host/:server', async (req, res) => {
  const scores = await DB.getAllImages();
  res.send(scores);
});

// get cpu host
secureApiRouter.get('/cpu/:host', async (req, res) => {
  const scores = await DB.getAllImages();
  res.send(scores);
});

// get cpu server
secureApiRouter.get('/mem/:host', async (req, res) => {
  const scores = await DB.getAllImages();
  res.send(scores);
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

async function getserverinfo(){
  try {
    return '{"mem": 4, "cpu": 40}';
  } 
  catch {
    return '{"mem": 4, "cpu": 40}';
  }
  
}

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

let connections = [];

wss.on('connection', async (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);
  ws.send(await getserverinfo());
  // Respond to pong messages by marking the connection alive
  ws.on('pong', async () => {
    connection.alive = true;
    connection.ws.send(await getserverinfo());
  });
  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });
});

setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);