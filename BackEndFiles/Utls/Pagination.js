export const Pagination = (Page,Limit)=>{
    if(!Page || Page <=0){
        Page=1;
    }

    if(!Limit || Limit <=0){
        Limit=2;
    }

    const Skip = (parseInt(Page)-1) * (parseInt(Limit)) ;

    return {Skip,Limit};
}