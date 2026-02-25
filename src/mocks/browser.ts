import { startMockServer } from './mock-server';
import { registerHandlers } from './handlers';

export function setupMocks() {
  registerHandlers();
  startMockServer();
}
