class error {
    static error(message:string) {
        return {status:400 , json:{message:message}};
    }
}
export default  error;