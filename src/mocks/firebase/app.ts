const config: Record<string, any> = {};

const app = {
  name: '[DEFAULT]',
  options: config,
};

export function initializeApp(cfg: Record<string, any>) {
  Object.assign(config, cfg);
  return app;
}

export function getApp() {
  return app;
}

export function getApps() {
  return [app];
}

export default { initializeApp, getApp, getApps };
