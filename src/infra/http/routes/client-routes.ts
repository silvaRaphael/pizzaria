import { Router } from 'express';

import { ClientController } from '../controllers/client-controller';
import { CreateClientUseCase } from '../../../application/use-cases/client-use-cases/create-client-use-case';
import { GetAllClientsUseCase } from '../../../application/use-cases/client-use-cases/get-all-clients-use-case';
import { GetClientUseCase } from '../../../application/use-cases/client-use-cases/get-client-use-case';
import { ClientRepositoryImpl } from '../../database/repositories/client-repository-impl';
import { UpdateClientUseCase } from '../../../application/use-cases/client-use-cases/update-client-use-case';
import { DeleteClientUseCase } from '../../../application/use-cases/client-use-cases/delete-client-use-case';

const router = Router();

const clientRepository = new ClientRepositoryImpl();
const clientController = new ClientController(
  new CreateClientUseCase(clientRepository),
  new GetClientUseCase(clientRepository),
  new GetAllClientsUseCase(clientRepository),
  new UpdateClientUseCase(clientRepository),
  new DeleteClientUseCase(clientRepository),
);

router.post('/clients', (req, res) => {
  clientController.createClient(req, res);
});

router.get('/client/:clientId', (req, res) => {
  clientController.getClient(req, res);
});

router.get('/clients', (req, res) => {
  clientController.getAllClients(req, res);
});

router.put('/client/:clientId', (req, res) => {
  clientController.updateClient(req, res);
});

router.delete('/client/:clientId', (req, res) => {
  clientController.deleteClient(req, res);
});

export default router;
