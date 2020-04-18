exports.validateTransactions = (data) => {
    const { fromAccountObj, toAccountObj, amount } = data;
    if( !((fromAccountObj.balance - amount) >= -500) ) 
        return { newFromAccountBalance: null, newToAccountBalance: null };
    
    return { newFromAccountBalance: fromAccountObj.balance-amount, newToAccountBalance: toAccountObj.balance+amount };
}