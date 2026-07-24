declare module "finnhub" {
    export class DefaultApi {
        constructor(apiKey: string);

        quote(
            symbol: string,
            callback: (
                error: unknown,
                data?: {
                    c: number;
                    d: number;
                    dp: number;
                    h: number;
                    l: number;
                    o: number;
                    pc: number;
                    t: number;
                },
                response?: unknown,
            ) => void,
        ): void;
    }
}
