import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  ApplicationState,
  ShoppingState,
  onUserLogout,
  UserState,
} from "../redux";

import { useNavigation } from "../utils";
import { LoginScreen } from "./LoginScreen";

interface AccountScreenProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onUserLogout: Function;
}

const _AccountScreen: React.FC<AccountScreenProps> = (props) => {
  const { navigate } = useNavigation();

  const { user } = props.userReducer;

  // useEffect(() => {
  //   if (user.token === undefined) {
  //     navigate("LoginPage");
  //   }
  // }, [user]);

  const optionCard = (title: string, action: Function) => {
    return (
      <TouchableOpacity
        onPress={() => action()}
        key={title}
        style={{
          backgroundColor: "#FFF",
          height: 80,
          justifyContent: "space-around",
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          paddingLeft: 50,
          paddingRight: 20,
          borderTopColor: "#030303",
          borderBottomColor: "#030303",
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
        }}
      >
        <Text style={{ flex: 1, fontSize: 18, color: "#525252" }}>{title}</Text>
        <Image
          source={require("../images/arrow_icon.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    );
  };

  const options = [
    {
      title: "Chỉnh sửa hồ sơ",
      action: () => {},
    },
    {
      title: "Xem đơn hàng",
      action: () => {
        navigate("AccountOrderPage");
      },
    },
    {
      title: "Liên hệ hỗ trợ",
      action: () => {},
    },
    {
      title: "Đăng xuất",
      action: () => {
        props.onUserLogout();
      },
    },
  ];
  if (user !== undefined && user._id !== undefined) {
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <View
            style={{
              display: "flex",
              height: 60,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Image
              source={require("../images/avatar.png")}
              style={{ width: 90, height: 90, marginRight: 20 }}
            />
            <View>
              <Text style={{ fontSize: 22, fontWeight: "600" }}>
                {user.firstName || "Tôi"}
              </Text>
              <Text style={{ fontSize: 18 }}>{user.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <ScrollView>
            {user._id !== undefined && !user.verified ? (
              optionCard("Xác nhận OTP", () => {
                navigate("LoginPage");
              })
            ) : (
              <></>
            )}
            {options.map(({ title, action }) => {
              return optionCard(title, action);
            })}
          </ScrollView>
        </View>
      </View>
    );
  } else {
    navigate('LoginPage');
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  navigation: {
    flex: 1,
    marginTop: 44,
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  body: { flex: 9, display: "flex" },
  footer: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  amountDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
  },
  paymentView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    margin: 5,
    backgroundColor: "#E3BE74",
  },
  paymentOptions: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
  },
  options: {
    display: "flex",
    height: 120,
    width: 160,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    borderColor: "#A0A0A0",
    backgroundColor: "#F2F2F2",
    borderWidth: 0.2,
    borderRadius: 10,
    margin: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#545252",
  },
  icon: {
    width: 115,
    height: 80,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const AccountScreen = connect(mapStateToProps, { onUserLogout })(
  _AccountScreen
);

export { AccountScreen };
