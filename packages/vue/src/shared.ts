import  eventBus  from "./eventBus";
import { Logger } from "@estjs/tools";
export const logger = new Logger("@estjs/zero");
export const bus = new eventBus(logger);

