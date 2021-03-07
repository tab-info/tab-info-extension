declare module '*.svg' {
  const path: string;
  export default path;
}

// eslint-disable-next-line no-redeclare, no-unused-vars
interface Window {
  haltBoot: boolean;
}