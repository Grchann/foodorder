import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { TextField } from "../components";
import { ButtonWithTitle } from "../components/ButtonWithTitle";
import { connect } from "react-redux";
import {
  ApplicationState,
  onUserLogin,
  onUserSignup,
  UserState,
  onVerifyOTP,
  onOTPRequest,
} from "../redux";
import { useNavigation } from "../utils";
import { LinearGradient } from "expo-linear-gradient";

interface LoginProps {
  onUserLogin: Function;
  onUserSignup: Function;
  userReducer: UserState;
  onVerifyOTP: Function;
  onOTPRequest: Function;
}

const _LoginScreen: React.FC<LoginProps> = ({
  onUserLogin,
  onUserSignup,
  userReducer,
  onVerifyOTP,
  onOTPRequest,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Đăng nhập");
  const [isSignup, setIsSignup] = useState(false);

  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(true);
  const [requestOtpTitle, setRequestOtpTitle] = useState(
    "Request a New OTP in"
  );
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  let countDown: any;

  const { user } = userReducer;

  const { navigate } = useNavigation();

  useEffect(() => {
    if (user.token !== undefined) {
      if (user.verified === true) {
        //navigate to Cart Page
        navigate("CartPage");
      } else {
        setVerified(user.verified);
        //check for start timer
        onEnableOtpRequest();
      }
    }

    return () => {
      clearInterval(countDown);
    };
  }, [user]);

  const onTapOptions = () => {
    setIsSignup(!isSignup);
    setTitle(!isSignup ? "Đăng kí" : "Đăng nhập");
  };

  const onTapAuthenticate = () => {
    if (isSignup) {
      onUserSignup(email, phone, password);
    } else {
      onUserLogin(email, password);
      console.log("logingin");
    }
  };

  const onEnableOtpRequest = () => {
    const otpDate = new Date();
    otpDate.setTime(new Date().getTime() + 2 * 60 * 1000);
    const otpTime = otpDate.getTime();

    countDown = setInterval(() => {
      const currentTime = new Date().getTime();

      const totalTime = otpTime - currentTime;

      let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

      setRequestOtpTitle(`Request a New OTP in ${minutes}:${seconds}`);

      if (minutes < 1 && seconds < 1) {
        setRequestOtpTitle("Request a New OTP");
        setCanRequestOtp(true);
        clearInterval(countDown);
      }
    }, 1000);
  };

  const onTapVerify = () => {
    onVerifyOTP(otp, user);
  };

  const onTapRequestNewOTP = () => {
    setCanRequestOtp(false);
    onOTPRequest(user);
  };

  if (!verified) {
    //show OTP Page
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={require("../images/verify_otp.png")}
            style={{ width: 120, height: 120, margin: 20 }}
          />
          <Text style={{ fontSize: 22, fontWeight: "500", margin: 10 }}>
            Verification
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
              marginBottom: 20,
              color: "#716F6F",
            }}
          >
            Enter your OTP sent to your mobile number
          </Text>
          <TextField isOTP={true} placeholder="OTP" onTextChange={setOtp} />

          <ButtonWithTitle
            title="Verify OTP"
            onTap={onTapVerify}
            width={340}
            height={50}
          />
          <ButtonWithTitle
            disable={!canRequestOtp}
            title={requestOtpTitle}
            isNoBg={true}
            onTap={onTapRequestNewOTP}
            width={430}
            height={50}
          />
        </View>
        <View style={styles.footer}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%", height: "35%", overflow: "hidden" }}>
          <Image
            source={require("../images/svgtop.png")}
            style={{ top: -290, left: -100, width: 600, height: 520 }}
          />
        </View>

        <View
          style={{
            width: "100%",
            height: "65%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 65,
              fontWeight: "700",
              color: "#34434D",
            }}
          >
            Chao Xìn
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "400",
              color: "gray",
            }}
          >
            {title} tài khoản của bạn.
          </Text>
          <TextInput
            placeholder="thientrang@gmail.com"
            style={styles.textInput}
            onChangeText={setEmail}
          />
          {isSignup ? (
            <TextInput
              placeholder="0123456789"
              style={styles.textInput}
              onChangeText={setPhone}
            />
          ) : (
            <></>
          )}
          <TextInput
            placeholder="password"
            style={styles.textInput}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <LinearGradient
            // Button Linear Gradient
            colors={["#FF8593", "#ff604e"]}
            style={{
              height: 50,
              width: "40%",
              marginTop: 20,
              borderRadius: 30,
              justifyContent: "center",
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={{ textAlign: "center" }} onPress={onTapAuthenticate}>
              {title}
            </Text>
          </LinearGradient>
          <Text style={{ color: "gray", marginTop: 10 }} onPress={onTapOptions}>
            {!isSignup
              ? "Bạn chưa có tài khoản? Đăng kí ngay"
              : "Bạn đã có tài khoản? Đăng nhập ngay"}
          </Text>

          {/* <ButtonWithTitle
            title={title}
            height={50}
            width={350}
            onTap={onTapAuthenticate}
          /> */}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f1",
  },
  textInput: {
    width: "80%",
    height: 50,
    padding: 10,
    paddingStart: 30,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  body: { flex: 6, justifyContent: "center", alignItems: "center" },
  footer: { flex: 3 },
});

const mapStateToProps = (state: ApplicationState) => ({
  shoppingReducer: state.shoppingReducer,
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapStateToProps, {
  onUserLogin,
  onUserSignup,
  onVerifyOTP,
  onOTPRequest,
})(_LoginScreen);

export { LoginScreen };
