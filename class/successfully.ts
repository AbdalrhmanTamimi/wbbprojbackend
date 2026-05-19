class successfully {
    static homePage(){
        return {status:200 , json:{message:'Welcome to backend'}};
    }
    static done(message:string) {
        return {status:200 , json:{message:message}};
    }
    static created(message:string) {
        return {status:201 , json:{message:message}};
    }
}
export default successfully;