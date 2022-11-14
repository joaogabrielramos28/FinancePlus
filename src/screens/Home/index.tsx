import { addMonths, subMonths } from "date-fns";
import { Box, Circle, Heading, VStack } from "native-base";
import React, { useState } from "react";
import { useTransactions } from "../../context/TransactionsContext";

import { CircularChart } from "./components/CircularChart";
import { LastTransactions } from "./components/LastTransactions";
import { LineChart } from "./components/LineChart";
import { MonthSelect } from "./components/MonthSelect";

export const Home = () => {
  const { transactions } = useTransactions();

  return (
    <VStack
      flex={1}
      bg={"background"}
      safeAreaTop
      alignItems={"center"}
      space={4}
    >
      <Heading color={"grayBrand.200"}>Resumo de gastos</Heading>
      <MonthSelect />
      <CircularChart />

      <LastTransactions />
    </VStack>
  );
};
