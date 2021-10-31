"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseDatabase = void 0;
const database_1 = require("firebase/database");
const Database_1 = require("./Database");
const uuid_1 = require("uuid");
class FirebaseDatabase extends Database_1.BaseDatabase {
    database;
    constructor(props) {
        super(props);
        this.database = (0, database_1.getDatabase)(props.firebaseApp);
        this.getRef = this.getRef.bind(this);
    }
    getRef(url) {
        return (0, database_1.ref)(this.database, url);
    }
    async createData(args) {
        try {
            const uuid = (0, uuid_1.v4)();
            const databaseRef = this.getRef(`${args.resource}/${uuid}`);
            const payload = {
                ...args.variables,
                id: uuid,
            };
            await (0, database_1.set)(databaseRef, this.requestPayloadFactory(args.resource, payload));
            return { data: payload };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async createManyData(args) {
        try {
            const data = await this.createData(args);
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async deleteData(args) {
        try {
            const databaseRef = this.getRef(`${args.resource}/${args.id}`);
            await (0, database_1.remove)(databaseRef);
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async deleteManyData(args) {
        try {
            args.ids.forEach(async (id) => {
                await this.deleteData({ resource: args.resource, id });
            });
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getList(args) {
        try {
            const databaseRef = this.getRef(args.resource);
            let snapshot = await (0, database_1.get)(databaseRef);
            if (snapshot?.exists()) {
                let data = Object.values(snapshot.val());
                data = data.map(item => this.responsePayloadFactory(args.resource, item));
                return { data };
            }
            else {
                Promise.reject();
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getMany(args) {
        try {
            let { resource, ids } = args;
            const databaseRef = this.getRef(resource);
            let snapshot = await (0, database_1.get)(databaseRef);
            if (snapshot?.exists()) {
                let data = ids.filter((item, i) => ids.indexOf(item) === i)?.map(id => snapshot.val()?.[id]);
                data = this.responsePayloadFactory(args.resource, data);
                return { data };
            }
            else {
                Promise.reject();
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getOne(args) {
        try {
            const databaseRef = this.getRef(args.resource);
            let snapshot = await (0, database_1.get)(databaseRef);
            if (snapshot?.exists()) {
                let data = this.responsePayloadFactory(args.resource, snapshot.val()?.[args.id]);
                return { data };
            }
            else {
                Promise.reject("");
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async updateData(args) {
        try {
            const databaseRef = this.getRef(`${args.resource}/${args.id}`);
            await (0, database_1.set)(databaseRef, this.requestPayloadFactory(args.resource, args.variables));
            return { data: args.variables };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async updateManyData(args) {
        try {
            let data = [];
            args.ids.forEach(async (id) => {
                const result = this.updateData({ resource: args.resource, variables: args.variables, id });
                data.push(result);
            });
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
}
exports.FirebaseDatabase = FirebaseDatabase;
//# sourceMappingURL=firebaseDatabase.js.map