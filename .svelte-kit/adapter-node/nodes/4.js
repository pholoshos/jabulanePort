

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gettingStarted/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.79e9d671.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/navigation.d418afde.js","_app/immutable/chunks/singletons.c32206f5.js","_app/immutable/chunks/Button.040683f0.js","_app/immutable/chunks/spread.8a54911c.js"];
export const stylesheets = ["_app/immutable/assets/Button.bd53f61f.css"];
export const fonts = [];
