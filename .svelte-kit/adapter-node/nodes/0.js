

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.df6ed6fc.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js"];
export const stylesheets = ["_app/immutable/assets/0.0bcc85bc.css"];
export const fonts = [];
