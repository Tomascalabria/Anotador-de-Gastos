import React, { createContext, useMemo, useState } from 'react'

export const ExpensesContext=createContext([])


export const ExpensesContextProvider = ({children}) => {
const [expenses,setExpenses]=useState([])
  return (
    <ExpensesContext.Provider value={useMemo(() => ({ expenses, setExpenses }), [
      expenses,
      setExpenses,
    ])}>
        {children}
    </ExpensesContext.Provider>

  )


}

