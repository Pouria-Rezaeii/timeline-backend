declare global {
   namespace NodeJS {
      interface ProcessEnv {
         MONGODB_PASS: string;
      }
   }
}

export {};
