

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.9a32b12e.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/stores.362afd76.js","_app/immutable/chunks/singletons.0fa6973b.js"];
export const stylesheets = [];
export const fonts = [];
