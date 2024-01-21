

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/create/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.72f1723d.js","_app/immutable/chunks/scheduler.35986cdd.js","_app/immutable/chunks/index.f0d1f3f0.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/index.0e7f8c4e.js","_app/immutable/chunks/localStorage.baf29d92.js","_app/immutable/chunks/navigation.22f46b94.js","_app/immutable/chunks/singletons.0fa6973b.js","_app/immutable/chunks/Image.b40029d9.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/Button.96c20868.js","_app/immutable/chunks/IconRenderer.dc2298cf.js","_app/immutable/chunks/NativeSelect.6a89a35b.js"];
export const stylesheets = ["_app/immutable/assets/Button.bd53f61f.css"];
export const fonts = [];
