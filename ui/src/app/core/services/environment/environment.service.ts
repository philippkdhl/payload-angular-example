import {inject, Injectable} from '@angular/core';
import {Environment} from '../../models/environment';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

/**
 * Service for managing dynamically loaded environment settings.
 */
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  protected env: Environment | undefined;
  private readonly http = inject(HttpClient);


  /**
   * get system specific environment settings from server
   *
   * @param url url to load environment settings
   */
  load(url: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
          this.http.get<Environment>(url).subscribe({
            next: data => {
              this.env = data;
              resolve(true);
            },
            error: () => reject(new Error('Failed to load environment settings'))
          })
          ;
        }
    );
  }

  /**
   * returns the dynamic environment settings
   */
  getEnvironment(): Environment | undefined {
    return this.env;
  }


  /**
   * return log level settings
   */
  get loggingLevel(): number | null {
    if (!this.env) {
      return null;
    }
    return this.env.loggingLevel;
  }

  /**
   * returns the postShopUrl

   /**
   * returns application environment
   *
   * @returns
   */
  get applicationEnvironment(): string | undefined {
    return this.env?.applicationEnvironment;
  }

}

/**
 * function to load environment during bootstrap
 *
 * @param environmentService environment service
 */
export function EnvironmentLoader(environmentService: EnvironmentService) {
  // Note: this factory need to return a function (that return a promise)
  return () => environmentService.load(environment.environmentUrl);
}
