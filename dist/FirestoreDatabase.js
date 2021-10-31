"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreDatabase = void 0;
const firestore_1 = require("firebase/firestore");
const Database_1 = require("./Database");
class FirestoreDatabase extends Database_1.BaseDatabase {
    database;
    constructor(props) {
        super(props);
        this.database = (0, firestore_1.getFirestore)();
        this.getCollectionRef = this.getCollectionRef.bind(this);
        this.getFilterQuery = this.getFilterQuery.bind(this);
    }
    getCollectionRef(resource) {
        return (0, firestore_1.collection)(this.database, resource);
    }
    getDocRef(resource, id) {
        return (0, firestore_1.doc)(this.database, resource, id);
    }
    getFilterQuery({ resource, sort, filters }) {
        const ref = this.getCollectionRef(resource);
        let queryFilter = filters?.map(filter => {
            const operator = getFilterOperator(filter.operator);
            return (0, firestore_1.where)(filter.field, operator, filter.value);
        });
        let querySorter = sort?.map(sorter => (0, firestore_1.orderBy)(sorter.field, sorter.order));
        if (queryFilter?.length && querySorter?.length) {
            return (0, firestore_1.query)(ref, ...queryFilter, ...querySorter);
        }
        else if (queryFilter?.length) {
            return (0, firestore_1.query)(ref, ...queryFilter);
        }
        else if (querySorter?.length) {
            return (0, firestore_1.query)(ref, ...querySorter);
        }
        else {
            return ref;
        }
    }
    async createData(args) {
        try {
            const ref = this.getCollectionRef(args.resource);
            const payload = this.requestPayloadFactory(args.resource, args.variables);
            const docRef = await (0, firestore_1.addDoc)(ref, payload);
            let data = {
                id: docRef.id,
                ...payload
            };
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async createManyData(args) {
        try {
            var data = await this.createData(args);
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async deleteData(args) {
        try {
            const ref = this.getDocRef(args.resource, args.id);
            await (0, firestore_1.deleteDoc)(ref);
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async deleteManyData(args) {
        try {
            args.ids.forEach(async (id) => {
                this.deleteData({ resource: args.resource, id });
            });
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getList(args) {
        try {
            const ref = this.getFilterQuery(args);
            let data = [];
            const querySnapshot = await (0, firestore_1.getDocs)(ref);
            querySnapshot.forEach(document => {
                data.push(this.responsePayloadFactory(args.resource, {
                    id: document.id,
                    ...document.data()
                }));
            });
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getMany(args) {
        try {
            const ref = this.getCollectionRef(args.resource);
            let data = [];
            const querySnapshot = await (0, firestore_1.getDocs)(ref);
            querySnapshot.forEach(document => {
                if (args.ids.includes(document.id)) {
                    data.push(this.responsePayloadFactory(args.resource, {
                        id: document.id,
                        ...document.data()
                    }));
                }
            });
            return { data };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async getOne(args) {
        try {
            if (args.resource && args.id) {
                const docRef = this.getDocRef(args.resource, args.id);
                const docSnap = await (0, firestore_1.getDoc)(docRef);
                const data = this.responsePayloadFactory(args.resource, { ...docSnap.data(), id: docSnap.id });
                return { data };
            }
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async updateData(args) {
        try {
            if (args.id && args.resource) {
                var ref = this.getDocRef(args.resource, args.id);
                await (0, firestore_1.updateDoc)(ref, this.requestPayloadFactory(args.resource, args.variables));
            }
            return { data: args.variables };
        }
        catch (error) {
            Promise.reject(error);
        }
    }
    async updateManyData(args) {
        try {
            args.ids.forEach(async (id) => {
                var ref = this.getDocRef(args.resource, id);
                await (0, firestore_1.updateDoc)(ref, this.requestPayloadFactory(args.resource, args.variables));
            });
        }
        catch (error) {
            Promise.reject(error);
        }
    }
}
exports.FirestoreDatabase = FirestoreDatabase;
function getFilterOperator(operator) {
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
//# sourceMappingURL=FirestoreDatabase.js.map