import * as _ from "lodash";

export function asJson(response: Response | void): any {
    if (!response) {
        return response;
    }

    return response.json();
}

function handleError(response: Response) {
    const err: any = new Error(response.statusText);
    err.response = response;

    throw err;
}

export function status(response: Response): Response | void {
    if (response.ok) {
        return response;
    }

    handleError(response);
}


export function toObject(collection: string[]): { [key: string]: boolean } {
    return _.reduce(collection, (obj, t) => ({ ...obj, [t]: true }), {});
}
