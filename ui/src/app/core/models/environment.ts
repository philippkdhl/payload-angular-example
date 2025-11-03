/**
 * Model class for keeping environment specific settings which will be
 * loaded during angular bootstrap.
 */
export class Environment {
  constructor(
      public loggingLevel: number,
      public applicationEnvironment: string,
      public twoMhGateway: string
  ) {}
}
