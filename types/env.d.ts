declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      UPLOAD_DIR: string;
    }
  }
}

export {};
