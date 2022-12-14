export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  handleChangePeriod: (action: "next" | "prev") => void;
  changeCreditCard: (creditCard: string) => Promise<void>;
  step: number;
  transactions: ITransaction[];
  actualPeriod: Date;
  transactionsByPeriod: ITransaction[];
  creditCardStyle: "purple" | "pink" | "blue";
  filterTransactions: {
    category: string;
    amount: number;
  };
  handleSetFilterTransactions: (data: {
    category: string;
    amount: number;
  }) => void;
  resetFilterTransactions: () => void;
  deleteTransaction: (id: string) => Promise<void>;
}

export interface ITransaction {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  amountWithoutMask: string;
  type: "income" | "outcome";
  date: string;
  dateFormatted: string;
  description?: string;
}
