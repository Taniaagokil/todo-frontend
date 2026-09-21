export declare const TodoModel: {
    getByUserId: (userId: number) => Promise<import("mysql2").QueryResult>;
    getById: (id: number, userId: number) => Promise<any>;
    create: (userId: number, task: string) => Promise<any>;
    update: (id: number, task: string, isCompleted: boolean, userId: number) => Promise<any>;
    delete: (id: number, userId: number) => Promise<any>;
};
//# sourceMappingURL=todoModel.d.ts.map