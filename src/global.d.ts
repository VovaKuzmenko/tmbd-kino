
// Vite уже поддерживает CSS Modules по умолчанию через файлы с суффиксом .module.css.
// TypeScript нужно сказать о модулях CSS — для этого создан global.d.ts.
declare module '*.module.css';
declare module '*.module.scss';
declare module '*.module.sass';
declare module '*.module.less';
declare module '*.module.styl';
