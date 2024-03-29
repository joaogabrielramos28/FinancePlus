import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Switch,
  Text,
  Toast,
  useTheme,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Plus } from "phosphor-react-native";

import { useAuth } from "@context/Auth/AuthContext";
import { SharedUserList } from "@context/Auth/types";
import {
  deleteItemFromAsyncStorage,
  setItemToAsyncStorage,
} from "@helpers/AsyncStorage";
import { AsyncStorageKeys } from "@helpers/types";
import { ActiveList } from "./components/ActiveList";
import { DisableList } from "./components/DisableList";
import { Header } from "@components/Header";
import { Layout } from "@components/Layout";

export const AccountConfig = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const {
    sharedUserNameList,
    changeUserSharedList,
    hasAccountShared,
    changeHasAccountShared,
  } = useAuth();

  const [sharedUserName, setSharedUserName] = useState<string>("");

  const handleChangeAccountShared = (value: boolean) => {
    changeHasAccountShared(value);
  };

  const handleAddSharedUser = () => {
    const newUser: SharedUserList = {
      id: String(new Date().getTime()),
      name: sharedUserName,
      type: "shared",
      active: true,
    };

    const hasUserInList = sharedUserNameList.find(
      (user) => user.name === newUser.name
    );
    if (!hasUserInList) {
      changeUserSharedList([...sharedUserNameList, newUser]);
      setItemToAsyncStorage(AsyncStorageKeys.SHARED_USER_LIST, newUser);
      setSharedUserName("");
      return;
    }
    return Toast.show({
      placement: "bottom",
      duration: 3000,
      render: () => (
        <Box
          bg="violetBrand.500"
          px="2"
          py="2"
          rounded="sm"
          mb={5}
          _text={{
            color: "grayBrand.100",
          }}
        >
          Usuário ja existe na lista!
        </Box>
      ),
    });
  };

  const handleChangeSharedUserName = (value: string) => {
    setSharedUserName(value);
  };

  const handleDisableSharedUser = (id: string) => {
    const newList = sharedUserNameList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: false,
        };
      }
      return item;
    });

    changeUserSharedList(newList);
    deleteItemFromAsyncStorage(AsyncStorageKeys.SHARED_USER_LIST, newList);
  };

  const handleActiveSharedUser = (id: string) => {
    const newList = sharedUserNameList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          active: true,
        };
      }
      return item;
    });
    changeUserSharedList(newList);
    deleteItemFromAsyncStorage(AsyncStorageKeys.SHARED_USER_LIST, newList);
  };

  const activesSharedUsers = sharedUserNameList.filter(
    (item) => item.active === true
  );

  const disabledSharedUsers = sharedUserNameList.filter(
    (item) => item.active === false
  );
  return (
    <Layout padding={6}>
      <Header title="Configurações da conta" onBack={goBack} />

      <HStack alignItems={"center"} justifyContent="space-between" mt={8}>
        <Text fontSize={"lg"} color={"grayBrand.300"}>
          Ativar conta conjunto
        </Text>
        <Switch
          colorScheme={"violetBrand"}
          size="sm"
          value={hasAccountShared}
          onValueChange={handleChangeAccountShared}
        />
      </HStack>
      {hasAccountShared ? (
        <VStack mt={8}>
          <Text fontSize={"lg"} color={"grayBrand.300"}>
            Adicionar usuário
          </Text>

          <HStack alignItems={"center"} space={2} mt={2}>
            <Input
              _focus={{
                borderColor: "violetBrand.700",
                backgroundColor: "transparent",
              }}
              value={sharedUserName}
              onChangeText={handleChangeSharedUserName}
              maxWidth={"300px"}
              width={"100%"}
              padding={3}
              borderRadius={"8px"}
              color={"grayBrand.100"}
            />
            <Button
              isDisabled={sharedUserName.length === 0}
              width={"48px"}
              bgColor={"violetBrand.700"}
              startIcon={<Plus size={20} color={colors.grayBrand[200]} />}
              onPress={handleAddSharedUser}
            />
          </HStack>

          <ActiveList
            data={activesSharedUsers}
            onDisable={handleDisableSharedUser}
          />

          <DisableList
            data={disabledSharedUsers}
            onActivate={handleActiveSharedUser}
          />
        </VStack>
      ) : null}
    </Layout>
  );
};
