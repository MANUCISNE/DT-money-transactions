import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

// sempre tipar o estado dentro do react, principalmente se ele for um array[]
interface Transaction {
  id: number
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  type: 'income' | 'outcome'
  category: string
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (input: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderTypeProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({
  children,
}: TransactionsProviderTypeProps) {
  // para mostrar em tela os dados, eu preciso ter um estado
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transaction', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])
  // o fetch sempre irá renderizar/executar quando alguma mudança acontecer dentro do Transactions, ou seja, não vai executar apenas 1x, e sim sempre que rendenrizar novamente o componente Transactions(). Então para renderizar apenas 1x devemos utilizar o fetch dentro UseEffect() do react.
  // fetch('http://localhost:3333/transaction').then(response => {
  // console.log(response)
  // })

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transaction', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  // o useEffect não pode ser async, para fazer async tem q fazer uma função fora do useEffect()

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
