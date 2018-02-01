import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the InspectorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'inspectorName',
})
export class InspectorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(inspectors: any, text:string) {
    if (!text) {
      return inspectors;
    }
    return inspectors.filter(inspector => inspector.attributes.name.toLowerCase().indexOf(text.toLowerCase()) != -1);
  }
}
