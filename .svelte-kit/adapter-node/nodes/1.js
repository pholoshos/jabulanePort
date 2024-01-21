

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.4db5ba2e.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/stores.3aa41ca1.js","_app/immutable/chunks/singletons.c32206f5.js"];
export const stylesheets = [];
export const fonts = [];
