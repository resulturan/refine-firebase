import { DataProvider } from "@pankod/refine-core";
import { IDatabaseOptions } from "./interfaces";

export abstract class BaseDatabase {

    constructor (private options?: IDatabaseOptions) {
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
        this.getAPIUrl = this.getAPIUrl.bind(this);
        this.requestPayloadFactory = this.requestPayloadFactory.bind(this);
        this.responsePayloadFactory = this.responsePayloadFactory.bind(this);
    }

    requestPayloadFactory(resource: string, data: any): any {
        if (this.options?.requestPayloadFactory) {
            return (this.options.requestPayloadFactory(resource, data));
        } else {
            return { ...data };
        }
    }

    responsePayloadFactory(resource: string, data: any): any {
        if (this.options?.responsePayloadFactory) {
            return (this.options?.responsePayloadFactory(resource, data));
        } else {
            return { ...data };
        }
    }

    abstract createData(args: any): Promise<any>;

    abstract createManyData(args: any): Promise<any>;

    abstract deleteData(args: any): Promise<any>;

    abstract deleteManyData(args: any): Promise<any>;

    abstract getList(args: any): Promise<any>;

    abstract getMany(args: any): Promise<any>;

    abstract getOne(args: any): Promise<any>;

    abstract updateData(args: any): Promise<any>;

    abstract updateManyData(args: any): Promise<any>;

    getAPIUrl() {
        return "";
    }

    getDataProvider(): DataProvider {
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
            getApiUrl: this.getAPIUrl,
        };
    }
}