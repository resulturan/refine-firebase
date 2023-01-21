import { Database, get, getDatabase, ref, remove, set } from "firebase/database";
import { ICreateData, IDeleteData, IDeleteManyData, IGetList, IGetMany, IGetOne, IDatabaseOptions, IUpdateData, IUpdateManyData } from "./interfaces";
import { BaseDatabase } from "./Database";

import { v4 as uuidv4 } from 'uuid';


export class FirebaseDatabase extends BaseDatabase {
    database: Database;

    constructor (options?: IDatabaseOptions, database?: Database) {
        super(options);
        this.database = database || getDatabase(options?.firebaseApp);
        this.getRef = this.getRef.bind(this);
    }

    getRef(url: string) {
        return ref(this.database, url);
    }

    async createData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any> {
        try {
            const uuid = uuidv4();
            const databaseRef = this.getRef(`${args.resource}/${uuid}`);
            const payload = {
                ...args.variables,
                id: uuid,
            };

            await set(databaseRef, this.requestPayloadFactory(args.resource, payload));

            return { data: payload };
        } catch (error) {
            Promise.reject(error);
        }
    }

    async createManyData<TVariables = {}>(args: ICreateData<TVariables>): Promise<any> {
        try {
            const data = await this.createData(args);

            return { data };
        } catch (error) {
            Promise.reject(error);
        }
    }

    async deleteData(args: IDeleteData): Promise<any> {
        try {
            const databaseRef = this.getRef(`${args.resource}/${args.id}`);
            await remove(databaseRef);
        } catch (error) {
            Promise.reject(error);
        }
    }

    async deleteManyData(args: IDeleteManyData): Promise<any> {
        try {
            args.ids.forEach(async id => {
                await this.deleteData({ resource: args.resource, id });
            });
        } catch (error) {
            Promise.reject(error);
        }
    }

    async getList(args: IGetList): Promise<any> {
        try {
            const databaseRef = this.getRef(args.resource);

            let snapshot = await get(databaseRef);

            if (snapshot?.exists()) {
                let data = Object.values(snapshot.val());
                data = data.map(item => this.responsePayloadFactory(args.resource, item));
                return { data };
            } else {
                Promise.reject();
            }
        } catch (error) {
            Promise.reject(error);
        }
    }

    async getMany(args: IGetMany): Promise<any> {
        try {
            let { resource, ids } = args;
            const databaseRef = this.getRef(resource);

            let snapshot = await get(databaseRef);

            if (snapshot?.exists()) {
                let data = ids.filter((item, i) => ids.indexOf(item) === i)?.map(id => snapshot.val()?.[id]);
                data = this.responsePayloadFactory(args.resource, data);

                return { data };
            } else {
                Promise.reject();
            }

        } catch (error) {
            Promise.reject(error);
        }
    }

    async getOne(args: IGetOne): Promise<any> {
        try {
            const databaseRef = this.getRef(args.resource);

            let snapshot = await get(databaseRef);

            if (snapshot?.exists()) {
                let data = this.responsePayloadFactory(args.resource, snapshot.val()?.[args.id]);

                return { data };
            } else {
                Promise.reject("");
            }
        } catch (error: any) {
            Promise.reject(error);
        }
    }

    async updateData<TVariables = {}>(args: IUpdateData<TVariables>): Promise<any> {
        try {
            const databaseRef = this.getRef(`${args.resource}/${args.id}`);

            await set(databaseRef, this.requestPayloadFactory(args.resource, args.variables));

            return { data: args.variables };
        } catch (error) {
            Promise.reject(error);
        }
    }
    async updateManyData<TVariables = {}>(args: IUpdateManyData<TVariables>): Promise<any> {
        try {
            let data: Array<any> = [];
            args.ids.forEach(async (id: string) => {
                const result = this.updateData({ resource: args.resource, variables: args.variables, id });
                data.push(result);
            });
            return { data };

        } catch (error) {
            Promise.reject(error);
        }
    }
}

