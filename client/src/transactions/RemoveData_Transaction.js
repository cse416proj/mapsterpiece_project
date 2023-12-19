import jsTPS_Transaction from "../common/jsTPS.js"

export default class RemoveData_Transaction extends jsTPS_Transaction {
    constructor(initMapInfo, initRegionName, initMapDataIndividualObj, initIndexElementTobeChanged) {
        super();
        this.mapInfo = initMapInfo;
        this.regionName = initRegionName;
        this.mapDataIndividualObj = initMapDataIndividualObj;
        this.indexElementTobeChanged = initIndexElementTobeChanged;
    }

    doTransaction() {
        this.mapInfo.deleteMapTypeData(this.regionName);
        this.mapInfo.setIsAddingDataByTransaction(false);
    }

    undoTransaction() {
        this.mapInfo.updateMapTypeData(this.mapDataIndividualObj, -1);
        this.mapInfo.setIsAddingDataByTransaction(true);
    }
}