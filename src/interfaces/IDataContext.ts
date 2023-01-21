export declare type VariableOptions = {
    type?: string;
    name?: string;
    value: any;
    list?: boolean;
    required?: boolean;
} | {
    [k: string]: any;
};
export declare type Fields = Array<string | object | NestedField>;
export declare type NestedField = {
    operation: string;
    variables: QueryBuilderOptions[];
    fields: Fields;
};
export interface QueryBuilderOptions {
    operation?: string;
    fields?: Fields;
    variables?: VariableOptions;
}
export declare type MetaDataQuery = {
    [k: string]: any;
} & QueryBuilderOptions;
export interface Pagination {
    current?: number;
    pageSize?: number;
}
export interface Search {
    field?: string;
    value?: string;
}
export declare type CrudOperators = "eq" | "ne" | "lt" | "gt" | "lte" | "gte" | "in" | "nin" | "contains" | "ncontains" | "containss" | "ncontainss" | "null";
export declare type CrudFilter = {
    field: string;
    operator: CrudOperators;
    value: any;
};
export declare type CrudSort = {
    field: string;
    order: "asc" | "desc";
};
export declare type CrudFilters = CrudFilter[];
export declare type CrudSorting = CrudSort[];
