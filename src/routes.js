import { Router } from 'express';

import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

/** Middleware of Entry Validators */
import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateRecipientIndex from './app/validators/RecipientIndex';
import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';
import validateDeliverymanIndex from './app/validators/DeliverymanIndex';
import validateDeliverymanStore from './app/validators/DeliverymanStore';
import validateDeliverymanUpdate from './app/validators/DeliverymanUpdate';
import validateDeliveryIndex from './app/validators/DeliveryIndex';
import validateDeliveryStore from './app/validators/DeliveryStore';
import validateDeliveryUpdate from './app/validators/DeliveryUpdate';
import validateOrderIndex from './app/validators/OrderIndex';
import validateOrderShow from './app/validators/OrderShow';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateDeliveryProblemIndex from './app/validators/DeliveryProblemIndex';
import validateDeliveryProblemShow from './app/validators/DeliveryProblemShow';
import validateDeliveryProblemStore from './app/validators/DeliveryProblemStore';

/** Middleware of Authorization */
import isPrivate from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.send('Hello World!');
});

/** CRIAÇAO E AUTENTICAÇAO DE USUARIOS */
routes.post('/sessions', validateSessionStore, SessionController.store);
routes.post('/users', isPrivate, validateUserStore, UserController.store);
routes.put('/users', isPrivate, validateUserUpdate, UserController.update);

/** ROTA DE ENVIO DE ARQUIVOS EM GERAL */
routes.post('/files', FileController.store);

/** ROTAS DE DESTINATARIOS */
routes.get(
  '/recipient',
  isPrivate,
  validateRecipientIndex,
  RecipientController.index
);
routes.post(
  '/recipient',
  isPrivate,
  validateRecipientStore,
  RecipientController.store
);
routes.put(
  '/recipient/:index',
  isPrivate,
  validateRecipientUpdate,
  RecipientController.update
);

/** ROTAS DE ENTREGADORES */
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.get(
  '/deliveryman',
  isPrivate,
  validateDeliverymanIndex,
  DeliverymanController.index
);
routes.post(
  '/deliveryman',
  isPrivate,
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.put(
  '/deliveryman/:id',
  isPrivate,
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliveryman/:id', isPrivate, DeliverymanController.delete);

/** ROTAS DE ENCOMENDAS */
routes.get(
  '/delivery',
  isPrivate,
  validateDeliveryIndex,
  DeliveryController.index
);
routes.post(
  '/delivery',
  isPrivate,
  validateDeliveryStore,
  DeliveryController.store
);
routes.put(
  '/delivery/:id',
  isPrivate,
  validateDeliveryUpdate,
  DeliveryController.update
);
routes.delete('/delivery/:id', isPrivate, DeliveryController.delete);

/** ROTAS DE ORDENS DE ENTREGA */
routes.get(
  '/deliveryman/:id/orders',
  validateOrderIndex,
  OrderController.index
);
routes.get(
  '/deliveryman/:id/deliveries',
  validateOrderShow,
  OrderController.show
);
routes.post('/deliveryman/:id/orders/:id_delivery', OrderController.store);
routes.put(
  '/deliveryman/:id/orders/:id_delivery',
  validateOrderUpdate,
  OrderController.update
);

/** ROTAS DE PROBLEMAS DE ENTREGA */
routes.get(
  '/delivery/problems',
  isPrivate,
  validateDeliveryProblemIndex,
  DeliveryProblemController.index
);
routes.get(
  '/delivery/:id/problems',
  validateDeliveryProblemShow,
  DeliveryProblemController.show
);
routes.post(
  '/delivery/:id/problems',
  validateDeliveryProblemStore,
  DeliveryProblemController.store
);
routes.delete(
  '/problem/:id/cancel-delivery',
  isPrivate,
  DeliveryProblemController.delete
);

export default routes;
