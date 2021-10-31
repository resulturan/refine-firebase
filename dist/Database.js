"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
class BaseDatabase {
    database;
    props;
    constructor(props) {
        this.props = props;
        this.getDataProvider = this.getDataProvider.bind(this);
        this.createData = this.createData.bind(this);
        this.createManyData = this.createManyData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.deleteManyData = this.deleteManyData.bind(this);
        this.getList = this.getList.bind(this);
        this.getMany = this.getMany.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateManyData = this.updateManyData.bind(this);
        this.customMethod = this.customMethod.bind(this);
        this.getAPIUrl = this.getAPIUrl.bind(this);
        this.requestPayloadFactory = this.requestPayloadFactory.bind(this);
        this.responsePayloadFactory = this.responsePayloadFactory.bind(this);
    }
    requestPayloadFactory(resource, data) {
        if (this.props.requestPayloadFactory) {
            return (this.props.requestPayloadFactory(resource, data));
        }
        else {
            return { ...data };
        }
    }
    responsePayloadFactory(resource, data) {
        if (this.props?.responsePayloadFactory) {
            return (this.props?.responsePayloadFactory(resource, data));
        }
        else {
            return { ...data };
        }
    }
    async createData(args) {
    }
    async createManyData(args) {
    }
    async deleteData(args) {
    }
    async deleteManyData(args) {
    }
    async getList(args) {
    }
    async getMany(args) {
    }
    async getOne(args) {
    }
    async updateData(args) {
    }
    async updateManyData(args) {
    }
    async customMethod(args) {
    }
    ;
    getAPIUrl() {
        return "";
    }
    getDataProvider() {
        return {
            create: this.createData,
            createMany: this.createManyData,
            deleteOne: this.deleteData,
            deleteMany: this.deleteManyData,
            getList: this.getList,
            getMany: this.getMany,
            getOne: this.getOne,
            update: this.updateData,
            updateMany: this.updateManyData,
            custom: this.customMethod,
            getApiUrl: this.getAPIUrl,
        };
    }
}
exports.BaseDatabase = BaseDatabase;
//# sourceMappingURL=Database.js.map