declare namespace ymaps {
    export function ready(): Promise;

    class Promise {
        then(onFulfilled?: Function, onRejected?: Function, onProgress?: Function, ctx?: any): Promise;
    }

    export class Map {
        constructor(element: string | any, state: MapState);
    }

    export class MapState {
        center: number[];
        controls: string[];
        zoom: number;
    }

    export class Placemark {
        constructor([], {}, {});
    }

    export class Polyline {
        constructor([], {}, {});
    }

    export class Circle {
        constructor([], {}, {});
    }

    namespace templateLayoutFactory {
        function createClass(template: string, overrides?: object, staticMethods?: object);
    }

    export class Clusterer {
        constructor({});
        add(a: any);
    }
}
