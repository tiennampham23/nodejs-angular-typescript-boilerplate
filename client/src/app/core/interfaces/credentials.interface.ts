import {SchemaTypeEnum} from '../enums';

export interface Credentials {
  email: string;
  token: string;
  type?: SchemaTypeEnum;
}
