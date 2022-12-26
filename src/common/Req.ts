class Req {
    body = {};
    userId = null;
    params = {};
    constructor(body, userId, params=null ) {
        this.body = body;
        this.userId = userId;
        this.params = params;
    }
    //cons
    static fromRestRequest(req) {
        return new Req(req.body, req.userId, req.params);
    }
}
export = Req;
