import { Pipe, PipeTransform } from '@angular/core';

type unit = 'bytes' | 'KB' | 'MB' | 'GB';
type unitPrecisionMap = {
  [u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
  bytes: 0,
  KB: 0,
  MB: 1,
  GB: 1
};

@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB'];

  transform(bytes: number = 0, precision: number | unitPrecisionMap = defaultPrecisionMap): string {
    let unitIndex = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unitIndex++;
    }

    const unit = this.units[unitIndex];

    if (typeof precision === 'number') {
      return `${bytes.toFixed(+precision)} ${unit}`;
    }
    return `${bytes.toFixed(precision[unit])} ${unit}`;
  }
}
