import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Calendar, ArrowCircleUp } from "phosphor-react-native";
import React from "react";
import { ITransactionDetailsScreenProps } from "../../@types/navigation";
import { categories } from "../../data/category";

export const TransactionDetails = () => {
  const { params } = useRoute();

  const { amount, category, date, description, subCategory, type } =
    params as ITransactionDetailsScreenProps;

  const selectedCategory = categories.find((item) => item.name === category);

  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const handleGoBack = () => {
    goBack();
  };

  return (
    <Box flex={1} background={"background"} safeAreaY px={6}>
      <HStack alignItems={"center"} space={2}>
        <IconButton
          size={"sm"}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
          onPress={handleGoBack}
        />

        <Heading color={"grayBrand.200"}>Detalhes da transação</Heading>
      </HStack>

      <HStack justifyContent={"space-evenly"} mt={8} alignItems="center">
        <HStack space={4} alignItems="center">
          <Box
            width={"54px"}
            height={"54px"}
            bg={"violetBrand.700"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={27}
          >
            <selectedCategory.icon
              color={colors.grayBrand[300]}
              weight="fill"
              size={32}
            />
          </Box>

          <VStack space={1}>
            <Heading size={"md"} color={colors.grayBrand[200]}>
              {category}
            </Heading>
            <Text color={colors.grayBrand[300]}>{subCategory}</Text>
          </VStack>
        </HStack>
        <HStack space={4} alignItems="center">
          <Box
            width={"54px"}
            height={"54px"}
            bg={"violetBrand.700"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={27}
          >
            <Calendar color={colors.grayBrand[300]} weight="fill" size={32} />
          </Box>

          <VStack space={1}>
            <Heading size={"md"} color={colors.grayBrand[200]}>
              Data
            </Heading>
            <Text color={colors.grayBrand[300]}>{date}</Text>
          </VStack>
        </HStack>
      </HStack>
      <VStack>
        <VStack alignItems={"center"} mt={4}>
          <Heading color={"grayBrand.200"} size={"md"}>
            Valor
          </Heading>
          <HStack alignItems={"center"} space={2}>
            <Text
              color={type === "outcome" ? "redBrand.500" : "greenBrand.500"}
              fontSize={"xl"}
            >
              {type === "outcome" ? "-" : "+"} {amount}
            </Text>
          </HStack>
        </VStack>

        <VStack mt={4} space={2}>
          <Heading color={"grayBrand.200"} size={"md"}>
            Observação
          </Heading>

          <Text fontSize={"md"} color={"grayBrand.300"}>
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};
