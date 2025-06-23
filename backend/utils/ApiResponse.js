class ApiResponse{
    constructor(statusCode , data , message = "Success"){
        this.statusCode = statusCode;
        if(data)
            this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }

    toString(){
        return this.message;
    }
}

export {ApiResponse};