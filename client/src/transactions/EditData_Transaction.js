import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditData_Transaction extends jsTPS_Transaction {
    constructor(initMapInfo, initIndexElementTobeChanged, initOldMapDataIndividualObj, initNewMapDataIndividualObj) {
        super();
        this.mapInfo = initMapInfo;
        this.indexElementTobeChanged = initIndexElementTobeChanged;
        this.oldMapDataIndividualObj = initOldMapDataIndividualObj;
        this.newMapDataIndividualObj = initNewMapDataIndividualObj;
    }

    doTransaction() {
        this.mapInfo.changeMapTypeData(this.indexElementTobeChanged, this.newMapDataIndividualObj);
        this.mapInfo.setIsEditingDataByTransaction(true);
    }

    undoTransaction() {
        this.mapInfo.changeMapTypeData(this.indexElementTobeChanged, this.oldMapDataIndividualObj);
        this.mapInfo.setIsEditingDataByTransaction(false);
    }
}