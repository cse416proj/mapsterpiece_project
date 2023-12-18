import jsTPS_Transaction from "../common/jsTPS.js"

export default class AddData_Transaction extends jsTPS_Transaction {
    constructor(initMapInfo, initMapDataIndividualObj, initIndexElementTobeChanged, initRegionName) {
        super();
        this.mapInfo = initMapInfo;
        this.mapDataIndividualObj = initMapDataIndividualObj;
        this.indexElementTobeChanged = initIndexElementTobeChanged;
        this.regionName = initRegionName;
    }

    doTransaction() {
        this.mapInfo.updateMapTypeData(this.mapDataIndividualObj, this.indexElementTobeChanged);
    }

    undoTransaction() {
        this.mapInfo.deleteMapTypeData(this.regionName);
    }
}