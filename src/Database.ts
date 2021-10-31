import { IPropsDatabase, IDataContextProvider } from "./interfaces";

export class BaseDatabase {
    props: IPropsDatabase;
    constructor (props: IPropsDatabase) {

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

    requestPayloadFactory(resource: string, data: any): any {
        if (this.props.requestPayloadFactory) {
            return (this.props.requestPayloadFactory(resource, data));
        } else {
            return { ...data };
        }
    }

    responsePayloadFactory(resource: string, data: any): any {
        if (this.props?.responsePayloadFactory) {
            return (this.props?.responsePayloadFactory(resource, data));
        } else {
            return { ...data };
        }
    }

    async createData(args: any): Promise<any> {

    }


    async createManyData(args: any): Promise<any> {

    }

    async deleteData(args: any): Promise<any> {

    }

    async deleteManyData(args: any): Promise<any> {

    }

    async getList(args: any): Promise<any> {

    }

    async getMany(args: any): Promise<any> {

    }

    async getOne(args: any): Promise<any> {

    }

    async updateData(args: any): Promise<any> {

    }
    async updateManyData(args: any): Promise<any> {

    }

    async customMethod(args: any): Promise<any> {

    }

    getAPIUrl() {
        return "";
    }

    getDataProvider(): IDataContextProvider {
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