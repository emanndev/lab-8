import _ from 'lodash';
import { Extension } from './types';
import extensionsData from './data/data.json';

export class ExtensionsManager {
  public static getExtensions(): Extension[] {
    return _.values(extensionsData);
  }
}
