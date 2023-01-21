import { FirebaseApp } from "@firebase/app";
import { MetaDataQuery, Pagination, CrudSorting, CrudFilters, CrudFilter } from "./IDataContext";

declare interface ICreateData<TVariables> {
    resource: string;
    variables: TVariables;
    metaData?: MetaDataQuery;
}

declare interface IUpdateData<TVariables> extends ICreateData<TVariables> {
    id?: string;
}

declare interface IUpdateManyData<TVariables> extends ICreateData<TVariables> {
    ids: Array<string>;
}

declare interface IDeleteData {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
}

declare interface IDeleteManyData extends Omit<IDeleteData, "id"> {
    ids: Array<string>;
}

declare interface IGetOne {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
}

declare interface IGetMany extends Omit<IGetOne, "id"> {
    ids: Array<string>;
}

declare interface IGetList {
    resource: string;
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
    metaData?: MetaDataQuery;
}

declare interface ICustomMethod {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    sort?: CrudSorting;
    filters?: CrudFilter[];
    payload?: {};
    query?: {};
    headers?: {};
    metaData?: MetaDataQuery;
}

declare interface IDatabaseOptions {
    firebaseApp?: FirebaseApp,
    requestPayloadFactory?: (resource: string, data: any) => any,
    responsePayloadFactory?: (resource: string, data: any) => any,
}
export { IDatabaseOptions, ICustomMethod, IGetList, IGetMany, IGetOne, IDeleteManyData, IDeleteData, IUpdateManyData, IUpdateData, ICreateData };