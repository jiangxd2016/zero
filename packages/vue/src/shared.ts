import { Logger } from '@estjs/tools';
import eventBus from './eventBus';

export const logger = new Logger('@estjs/zero');
export const bus = new eventBus(logger);

