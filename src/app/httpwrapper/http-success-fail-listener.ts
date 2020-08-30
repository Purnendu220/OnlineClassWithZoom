export interface HttpSuccesFailureResponse{
    onSuccess(type,responsedata);
    onFailure(type,response: any);
}
