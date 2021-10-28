import { Firestore, getDocs, getFirestore, collection, addDoc, doc, getDoc, updateDoc, deleteDoc, where, query, CollectionReference, DocumentData, Query, orderBy, arrayUnion, arrayRemove } from "firebase/firestore";
import { ICreateData, IDeleteData, IDeleteManyData, IGetList, IGetMany, IGetOne, IUpdateData, IUpdateManyData } from "./interfaces/IDataBase";
import { BaseDatabase } from "./Database";
import { CrudOperators } from "@pankod/refine";


export class FirestoreDatabase extends BaseDatabase {
    database: Firestore;
    requestPayloadFactory: (resource: string, data: any) => any;
    responsePayloadFactory: (resource: string, data: any) => any;

    constructor (requestPayloadFactory, responsePayloadFactory) {
        super();
        this.database = getFirestore();

        this.getCollectionRef = this.getCollectionRef.bind(this);
        this.getFilterQuery = this.getFilterQuery.bind(this);
        this.controlAdditionalProcess = this.controlAdditionalProcess.bind(this);

        this.requestPayloadFactory = requestPayloadFactory;
        this.responsePayloadFactory = responsePayloadFactory;
    }

    getCollectionRef(resource: string) {
        return collection(this.database, resource);
    }

    getFilterQuery({ resource, sort, filters }: IGetList): (CollectionReference<DocumentData> | Query<DocumentData>) {
        const ref = this.getCollectionRef(resource);
        let queryFilter = filters?.map(filter => {
            const operator = getFilterOperator(filter.operator);
            return where(filter.field, operator, filter.value);
        });
        let querySorter = sort?.map(sorter => orderBy(sorter.field, sorter.order));

        if (queryFilter?.length && querySorter?.length) {
            return query(ref, ...queryFilter, ...querySorter);
        } else if (queryFilter?.length) {
            return query(ref, ...queryFilter);
        } else if (querySorter?.length) {
            return query(ref, ...querySorter);
        }
        else {
            return ref;
        }
    }

    async controlAdditionalProcess({ resource, variables, id, action }: { resource: string, variables?: any, id: string, action: string; }): Promise<any> {

        if (resource === "sessions" && variables.workshopId) {
            const workshopRef = doc(this.database, "workshops", variables.workshopId);

            if (action === "create") {
                await updateDoc(workshopRef, { workshops: arrayUnion(id) });
            } else if (action === "delete") {
                await updateDoc(workshopRef, { workshops: arrayRemove(id) });
            }
        }
    }

    async createData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any> {
        try {
            const ref = this.getCollectionRef(args.resource);

            const payload = this.requestPayloadFactory(args.resource, args.variables);

            console.log(args.variables)

            const docRef = await addDoc(ref, payload);

            await updateDoc(doc(this.database, args.resource, docRef.id), { id: docRef.id });

            let data = {
                id: docRef.id,
                ...payload
            };

            await this.controlAdditionalProcess({ resource: args.resource, variables: args.variables, id: data.id, action: "create" });

            return { data };
        } catch (error) {
            Promise.reject(error);
        }
    }

    async createManyData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any> {
        try {
            const ref = this.getCollectionRef(args.resource);

            const payload = this.requestPayloadFactory(args.resource, args.variables);

            const docRef = await addDoc(ref, payload);

            await updateDoc(doc(this.database, args.resource, docRef.id), { id: docRef.id });

            let data = {
                id: docRef.id,
                ...payload
            };

            return { data };
        } catch (error) {
            Promise.reject(error);
        }
    }

    async deleteData(args: IDeleteData): Promise<any> {
        try {
            var { data } = await this.getOne(args);

            await this.controlAdditionalProcess({ resource: args.resource, id: args.id, variables: data, action: "delete" })

            const ref = doc(this.database, args.resource, args.id);

            await deleteDoc(ref);
        } catch (error) {
            Promise.reject(error);
        }
    }

    async deleteManyData(args: IDeleteManyData): Promise<any> {
        try {
            args.ids.forEach(async id => {
                const ref = doc(this.database, args.resource, id);
                await deleteDoc(ref);
            });
        } catch (error) {
            Promise.reject(error);
        }
    }

    async getList(args: IGetList): Promise<any> {
        // const { resource, pagination, sort, filters, metaData } = args;
        try {
            const ref = this.getFilterQuery(args);
            let data: any[] = [];

            const querySnapshot = await getDocs(ref);

            querySnapshot.forEach(doc => {
                data.push(this.responsePayloadFactory(args.resource, {
                    id: doc.id,
                    ...doc.data()
                }));
            });
            return { data };

        } catch (error) {
            Promise.reject(error);
        }
    }

    async getMany(args: IGetMany): Promise<any> {
        try {
            const ref = this.getCollectionRef(args.resource);
            let data: any[] = [];

            const querySnapshot = await getDocs(ref);

            querySnapshot.forEach(doc => {
                if (args.ids.includes(doc.id)) {
                    data.push({
                        id: doc.id,
                        ...doc.data()
                    });
                }
            });
            return { data };


        } catch (error) {
            Promise.reject(error);
        }
    }

    async getOne(args: IGetOne): Promise<any> {
        try {
            if (args.resource && args.id) {
            const docRef = doc(this.database, args.resource, args.id);

                const docSnap = await getDoc(docRef);

                return { data: docSnap.data() };
            }

        } catch (error: any) {
            Promise.reject(error);
        }
    }

    async updateData<TVariables = {}>(args: IUpdateData<TVariables>): Promise<any> {
        try {
            if (args.id && args.resource) {
                // var payload: any = {};
                var ref = doc(this.database, args.resource, args.id);

                // for (const [key, value] of Object.entries(args.variables)) {
                //     payload = {
                //         ...payload,
                //         [key]: value.isArrayItem ? arrayUnion(value.data) : value
                //     };
                // }

                await updateDoc(ref, args.variables);
            }

            return { data: args.variables };
        } catch (error) {
            Promise.reject(error);
        }
    }
    async updateManyData<TVariables = {}>(args: IUpdateManyData<TVariables>): Promise<any> {
        try {
            args.ids.forEach(async id => {


            });

        } catch (error) {
            Promise.reject(error);
        }
    }
}

function getFilterOperator(operator: CrudOperators) {
    switch (operator) {
        case "lt":
            return "<";
        case "lte":
            return "<=";

        case "gt":
            return ">";
        case "gte":
            return ">=";

        case "eq":
            return "==";
        case "ne":
            return "!=";

        case "nin":
            return "not-in";

        case "in":
        default:
            return "in";
    }
}