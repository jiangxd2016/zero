import type { Logger } from "@estjs/tools";
class eventBus {
  subs = new Map();
  Logger: Logger | null = null;
  instance: eventBus | null = null;
  constructor(logger:Logger|null = null) {
    this.Logger = logger;
    this.Logger?.info('eventBus init')
    return this.instance ||= new eventBus();
  }

  on(type: string, callback: Function) {
    const sub = this.subs.get(type);
    const isEmpty = sub && sub.push(callback);
    if (!isEmpty) {
      // log
      this.Logger?.info(`eventBus on ${type} callback ${callback}`);

      this.subs.set(type, [callback]);
    }
  }

  emit(type: string, ...payload: any[]) {
    (this.subs.get(type) || []).forEach((fn: Function) => {
      // log
      this.Logger?.info(`eventBus emit ${type} callback ${fn}`);
      fn(...payload);
    });
    (this.subs.get('*') || []).forEach((fn: Function) => {
      this.Logger?.info(`eventBus emit * callback ${fn}`);
      fn(...payload);
    });
  }

  off(type: string, callback: Function) {
    const sub = this.subs.get(type);
    if (sub) {
      this.Logger?.info(`eventBus off ${type} callback ${callback}`);
      sub.splice(sub.indexOf(callback) >>> 0, 1);
    }
  }
}

export default eventBus;
