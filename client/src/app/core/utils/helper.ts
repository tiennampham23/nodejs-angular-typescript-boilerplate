import {HttpParams} from '@angular/common/http';

export function fmt<TObject>(text: string, myHash: TObject): string {
  let key;
  // tslint:disable-next-line: forin
  for (key in myHash) {
    text = text.replace(new RegExp('\\{' + key + '\\}', 'gm'), myHash[key]);
  }
  return text;
}

export function isEmpty(args: any): boolean {
  return (
    args === null || args === undefined || args === ''
    || args.length === 0 || args === 'null' || args === 'undefined'
  );
}

export function isNotEmpty(args: any): boolean {
  return !isEmpty(args);
}


// tslint:disable-next-line: ban-types
export function mapToHttpParamsQuery(params: Object): HttpParams {
  let httpParams: HttpParams = new HttpParams();
  for (const property in params) {
    if (params.hasOwnProperty(property) && isNotEmpty(params[property])) {
      httpParams = httpParams.set(property, params[property]);
    }
  }
  return httpParams;
}

export function mapToFormData(body: object): FormData {
  const formData = new FormData();
  for (const property in body) {
    if (body.hasOwnProperty(property) && isNotEmpty(body[property])) {
      formData.append(property, body[property]);
    }
  }
  return formData;
}

export function removeTheFirstChar(args: string): string {
  if (isEmpty(args)) {
    return '';
  }
  return args.substring(1, args.length);
}

export function removeTheLastChar(args: string): string {
  if (isEmpty(args)) {
    return '';
  }
  return args.substring(0, args.length - 1);
}

export function isString(object: any): boolean {
  return typeof object === 'string';
}


export function deepCopyObject(source, target): void {
  Object.keys(source).forEach((property) => {
    target[property] = source[property];
  });
}


export function convertToInt(d): number {
  return Math.floor(d);
}

