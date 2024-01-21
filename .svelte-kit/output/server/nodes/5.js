

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/grades/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.6b527f5a.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/singletons.0fa6973b.js","_app/immutable/chunks/moment.3dcd84d5.js","_app/immutable/chunks/Button.96c20868.js","_app/immutable/chunks/IconRenderer.dc2298cf.js","_app/immutable/chunks/Image.b40029d9.js","_app/immutable/chunks/navigation.22f46b94.js","_app/immutable/chunks/index.0e7f8c4e.js","_app/immutable/chunks/user.ec9c02ec.js","_app/immutable/chunks/localStorage.baf29d92.js","_app/immutable/chunks/Alert.3de39344.js","_app/immutable/chunks/ActionIcon.df56dee4.js"];
export const stylesheets = ["_app/immutable/assets/5.4f1e9ba5.css","_app/immutable/assets/Button.bd53f61f.css"];
export const fonts = [];
