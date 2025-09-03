// global.d.ts
// Basit deklarasyonlar: lowlight'in core alt yolunu ve highlight.js'in diller alt yolunu kabul ettiriyoruz.
// Eğer daha sağlam tip istersen, daha ayrıntılı declare ekleyebilirsin.

declare module 'lowlight/lib/core' {
  // minimal any tip; gerektiğinde daha iyi tip ekleyebilirsin
  const lowlight: any;
  export { lowlight };
  export default lowlight;
}

declare module 'lowlight' {
  const lowlight: any;
  export { lowlight };
  export default lowlight;
}

declare module 'highlight.js/lib/languages/*' {
  const _default: any;
  export default _default;
}