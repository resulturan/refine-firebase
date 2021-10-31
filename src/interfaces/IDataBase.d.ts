import { FirebaseApp } from "@firebase/app";
import { MetaDataQuery, Pagination, CrudSorting, CrudFilters, CrudFilter } from "@pankod/refine/dist/interfaces";

interface ICreateData<TVariables> {
    resource: string;
    variables: TVariables;
    metaData?: MetaDataQuery;
}

interface IUpdateData<TVariables> extends ICreateData<TVariables> {
    id?: string;
}

interface IUpdateManyData<TVariables> extends ICreateData<TVariables> {
    ids: Array<string>;
}

interface IDeleteData {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
}

interface IDeleteManyData extends Omit<IDeleteData, "id"> {
    ids: Array<string>;
}

interface IGetOne {
    resource: string;
    id: string;
    metaData?: MetaDataQuery;
}

interface IGetMany extends Omit<IGetOne, "id"> {
    ids: Array<string>;
}

interface IGetList {
    resource: string;
    pagination?: Pagination;
    sort?: CrudSorting;
    filters?: CrudFilters;
    metaData?: MetaDataQuery;
}

interface ICustomMethod {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    sort?: CrudSorting;
    filters?: CrudFilter[];
    payload?: {};
    query?: {};
    headers?: {};
    metaData?: MetaDataQuery;
}

interface IPropsDatabase {
    firebaseApp?: FirebaseApp,
    requestPayloadFactory?: (resource: string, data: any) => any,
    responsePayloadFactory?: (resource: string, data: any) => any,
}

export { IPropsDatabase, ICustomMethod, IGetList, IGetMany, IGetOne, IDeleteManyData, IDeleteData, IUpdateManyData, IUpdateData, ICreateData };