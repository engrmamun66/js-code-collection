const printError = function(...messages) {
    /**
     * messageArrays = ['This is a header', 'This is a sample message' ]
     * Exaple: printError
     */
    let headingStyle = "font-size:14px;";
    let subHeadingStyle = "font-size:13px;";
    let messageStyle = "background-color:#f2f3f8;padding:5px 10px;color:tomato;font-size:11px;border-radius:3px;";
    let mainGroup = 'RentMy CDN';
    console.group(`%c` + mainGroup, headingStyle);

    if(messages?.length){
        messages.forEach((msg, i) => {           
            
            let isArray = Array.isArray(msg);            
            let groupName = (isArray && msg?.length == 2) ? msg?.[0] : null;
            let message = (isArray && msg?.length == 2) ? msg?.[1] : (isArray ? msg?.[0] : msg) || null;

            console.group('%c' + (groupName || `Group-${i}`), subHeadingStyle); 
            
            if(typeof message == 'object'){
                console.log(message);
            } else {
                console.log('%c' + message, messageStyle);
            }
            console.groupEnd(groupName)
        })
    }  
    console.groupEnd(mainGroup);
}

export default printError