export class District {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Taluka {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Village {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Station {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Section {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Feeder {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class Transformer {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class LoadType {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}

export class AppRoot {
    constructor(){
        this.districts = new Array<District>();
        this.loadTypes = new Array<LoadType>();
        this.talukas = new Map<number, Taluka[]>();
        this.villages = new Map<number, Village[]>();
        this.stations = new Map<number, Station[]>();
        this.sections = new Map<number, Section[]>();
        this.feeders = new Map<number, Feeder[]>();
        this.transformers = new Map<number, Transformer[]>();
    }
    districts: District[];
    loadTypes: LoadType[];
    talukas: Map<number, Taluka[]>;
    villages: Map<number, Village[]>;
    stations: Map<number, Station[]>;
    sections: Map<number, Section[]>;
    feeders: Map<number, Feeder[]>;
    transformers: Map<number, Transformer[]>;
}

export class SaveTaluka {
    constructor(public districtId: number, public talukas: Taluka[]) {
        this.districtId = districtId;
        this.talukas = talukas;
    }
    // public districtId: number;
    // public talukas: Taluka[];
}

export class SaveVillage {
    constructor(talukaId: number, villages: Village[]) {
        this.talukaId = talukaId;
        this.villages = villages;
    }
    talukaId: number;
    villages: Village[];
}

export class SaveStation {
    constructor(public villageId: number, public stations: Station[]) {}
}
