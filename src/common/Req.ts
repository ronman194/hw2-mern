class Req {
    body = {};
    userId = null;
    constructor(body, userId) {
        this.body = body;
        this.userId = userId;
    }
    //cons
    static fromRestRequest(req) {
        return new Req(req.body, req.userId);
    }
}
export = Req;
