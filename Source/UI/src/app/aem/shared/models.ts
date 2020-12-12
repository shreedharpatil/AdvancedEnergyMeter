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
const pleaseSelect = '-----Please Select-----';
export const defaultDistrict = { id: 0, name: pleaseSelect };
export const defaultTaluka = { id: 0, name: pleaseSelect };
export const defaultVillage = new Village(0, pleaseSelect); // [[0, [defaultVillage]]]
export const defaultLoadType = new LoadType(0, pleaseSelect);
export const defaultstation = new Station(0, pleaseSelect);
export const defaultSection = new Section(0, pleaseSelect);
export const defaultFeeder = new Feeder(0, pleaseSelect);
export const defaultTransformer = new Transformer(0, pleaseSelect);

export class AppRoot {
    constructor() {
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

export class SaveSection {
    constructor(public stationId: number, public sections: Section[]) {}
}

export class SaveFeeder {
    constructor(public sectionId: number, public feeders: Feeder[]) {}
}

export class SaveTransformer {
    constructor(public feederId: number, public transformers: Transformer[]) {}
}

export class Customer {
    constructor() {
        this.rrNumber = '';
        this.firstName = '';
        this.lastName = '';
        this.loadTypeId = 0;
        this.districtId = 0;
        this.talukaId = 0;
        this.villageId = 0;
        this.stationId = 0;
        this.sectionId = 0;
        this.feederId = 0;
        this.transformerId = 0;
        this.mobileNumber = '';
    }

    public rrNumber: string;
    public firstName: string;
    public lastName: string;
    public loadTypeId: number;
    public districtId: number;
    public talukaId: number;
    public villageId: number;
    public stationId: number;
    public sectionId: number;
    public feederId: number;
    public transformerId: number;
    public mobileNumber: string;
}
