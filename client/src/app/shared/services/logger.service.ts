export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
}

export type LogOutput = (
  source: string,
  level: LogLevel,
  ...objects: any[]
) => void;

export class Logger {
  static level = LogLevel.Debug;

  static outputs: LogOutput[] = [];

  constructor(private source?: string) {}

  debug(...objects: any[]): void {
    this.log(console.log, LogLevel.Debug, objects);
  }

  info(...objects: any[]): void {
    this.log(console.log, LogLevel.Info, objects);
  }

  warn(...objects: any[]): void {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  error(...objects: any[]): void {
    this.log(console.error, LogLevel.Error, objects);
  }

  private log(func: () => void, level: LogLevel, objects: any[]): void {
    if (level <= Logger.level) {
      const log = this.source
        ? ['[' + this.source + ']'].concat(objects)
        : objects;
      // func.apply(console, log);
      Logger.outputs.forEach((output) =>
        output.apply(output, [this.source, level].concat(objects))
      );
    }
  }
}
