import { Pipe, PipeTransform } from '@angular/core';

export interface KeyValue<T> {
    key: keyof T;
    value: any;
  }

@Pipe({ name: 'customKeyValue' })
export class CustomKeyValuePipe implements PipeTransform {
  transform<T>(value: T, _?: [{id: number, value: string}]): KeyValue<T>[] {
    console.log(value);
    return Object.keys(value).map(key => {
      const objectKey = key as keyof T;
      console.log(objectKey, value[objectKey]['name']);
      return {
        key: value[objectKey]["id"],
        value: value[objectKey]['name'],
      };
    });
  }
}

export function trackByKeyValue<T>(_: number, item: KeyValue<T>) {
    return item.key;
  }