import App from './app';
import CarRoutes from './routes/car.routes';

const server = new App();
server.addRouter(CarRoutes);

export default server;
