

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gettingStarted/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.4754f004.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/navigation.22f46b94.js","_app/immutable/chunks/singletons.0fa6973b.js","_app/immutable/chunks/Button.96c20868.js","_app/immutable/chunks/spread.8a54911c.js"];
export const stylesheets = ["_app/immutable/assets/Button.bd53f61f.css"];
export const fonts = [];
