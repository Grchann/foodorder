import React, { useState, useEffect } from "react";

import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { TextField } from "../components";
import { connect } from "react-redux";
import {
  ApplicationState,
  onUserLogin,
  onUserSignup,
  UserState,
  onVerifyOTP,
  onOTPRequest,
} from "../redux";
import { LinearGradient } from "expo-linear-gradient";

interface LoginProps {
  onUserLogin: Function;
  onUserSignup: Function;
  userReducer: UserState;
  onVerifyOTP: Function;
  onOTPRequest: Function;
  navigation: { getParam: Function; goBack: Function };
}

const _LoginScreen: React.FC<LoginProps> = ({
  onUserLogin,
  onUserSignup,
  userReducer,
  onVerifyOTP,
  onOTPRequest,
  navigation,
}) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("Đăng nhập");
  const [isSignup, setIsSignup] = useState(false);

  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(true);
  const [requestOtpTitle, setRequestOtpTitle] = useState(
    "Mã OTP còn hiệu lực trong"
  );
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [errPassword, setErrPassword] = useState('');
  const [isInvalidPhone, setIsInvalidPhone] = useState(false);
  const [errPhone, setErrPhone] = useState('');
  const [isInvalidOTP, setIsInvalidOTP] = useState(false);
  const [errOTP, setErrOTP] = useState('');

  let countDown: any;

  const { user } = userReducer;

  // const {navigate} = useNavigation()
  const { goBack } = navigation;

  useEffect(() => {
    setVerified(user.verified);
    if (user._id !== undefined) {
      if (!user.verified) {
        // OTP Page
        onEnableOtpRequest();
      } else {
        // Back Page
        goBack();
      }
    } else {
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
      validateEmail(email);
      validatePhone(phone);
      validatePassword(password);
      if (!(isInvalidEmail || isInvalidPassword || isInvalidPhone)){
        onUserSignup(email, phone, password);
      }
    } else {
      validateEmail(email);
      validatePassword(password);
      if (!(isInvalidEmail || isInvalidPassword)){
        onUserLogin(email, password);
        console.log("logingin");
      }
      
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

      setRequestOtpTitle(`Mã OTP còn hiệu lực trong ${minutes}:${seconds}`);

      if (minutes < 1 && seconds < 1) {
        setRequestOtpTitle("Bạn chưa nhận được mã OTP?");
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
    onEnableOtpRequest();
  };


  const validateEmail = (email: string) => {
    if (email === undefined || email === '' || email.trim() === ''){
      setIsInvalidEmail(true);
      setErrEmail('Không được để trống hoặc chỉ có dấu khoảng cách')
    }
    // if (!email.includes('@')){
    //   setIsInvalidEmail(true);
    //   setErrEmail('Định dạng email chưa đúng')
    // }
    else if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)){
      setIsInvalidEmail(true);
      setErrEmail('Định dạng email chưa đúng')
    }
  };

  const validatePassword = (password: string) => {
    if (password === undefined || password === ''){
      setIsInvalidPassword(true);
      setErrPassword('Không được để trống')
    }
  };

  const validatePhone = (phone: string) => {
    if (phone === undefined || phone === '' || phone.trim() === ''){
      setIsInvalidPhone(true);
      setErrPhone('Không được để trống hoặc chỉ có dấu khoảng cách')
    }
    if (!(phone[0] === '0' || phone[0] === '+')){
      setIsInvalidPhone(true);
      setErrPhone('Định dạng số điện thoại chưa đúng')
    }
  };

  const validateOTP = (otp: string) => {
    if (otp === undefined || otp === '' || otp.trim() === ''){
      setIsInvalidOTP(true);
      setErrOTP('Không được để trống hoặc chỉ có dấu khoảng cách')
    }
  };

  if (user._id !== undefined && !verified) {
    //show OTP Page
    return (
      <View
        style={{
          paddingTop: 50,
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          height: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#c0c0c0",
            marginTop: 35,
            fontWeight: "bold",
          }}
        >
          Xác nhận tài khoản
        </Text>
        <Image
          source={require("../images/receiveOTP.png")}
          style={{ marginTop: 80 }}
        />
        <Text
          style={{
            fontSize: 20,
            marginTop: 40,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Xác nhận{"\n"}số điện thoại thành công
        </Text>
        <Text
          style={{
            fontSize: 16,
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
            color: "gray",
          }}
        >
          Nhập mã OTP được gửi tới điện thoại của bạn
        </Text>
        {/* <TextField isOTP={true} placeholder="OTP" onTextChange={setOtp} /> */}
        <TextInput
          placeholder="494949"
          style={[styles.textInput, {margin: 10, height: 60, fontSize: 30, textAlign: 'center', paddingStart: 14, borderColor: isInvalidEmail ? '#ff0000' : '#fff'}]}
          maxLength={6}
          keyboardType="numeric"
          onChangeText={setOtp}
          onFocus={()=>{
            setIsInvalidOTP(false);
            setErrOTP('');
          }}
          onBlur={()=>{
            validateOTP(otp);
          }}
        />
        {isInvalidOTP ? (
          <View style={styles.invalidMessageContainer}>
            <Text style={styles.invalidMessage}>{errOTP}</Text>
          </View>
        ) : (<></>)}
        
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>{requestOtpTitle}</Text>
          {canRequestOtp ? (
            <Text
              onPress={onTapRequestNewOTP}
              style={{ marginLeft: 5, color: "#ff604e" }}
            >
              Gửi lại OTP
            </Text>
          ) : (
            <></>
          )}
        </View>

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
          <Text
            style={{ textAlign: "center", color: "white", fontSize: 15 }}
            onPress={onTapVerify}
          >
            Xác nhận OTP
          </Text>
        </LinearGradient>
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
            style={[styles.textInput, {borderColor: isInvalidEmail ? '#ff0000' : '#fff'}]}
            onChangeText={setEmail}
            onFocus={()=>{
              setIsInvalidEmail(false);
              setErrEmail('');
            }}
            onBlur={()=>{
              validateEmail(email);
            }}
          />
            {isInvalidEmail ? (
              <View style={styles.invalidMessageContainer}>
                <Text style={styles.invalidMessage}>{errEmail}</Text>
              </View>
            ) : (<></>)}
          
          {isSignup ? (<>
            <TextInput
                placeholder="0123456789"
                style={[styles.textInput, {borderColor: isInvalidPhone ? '#ff0000' : '#fff'}]}
                keyboardType="numeric"
                onChangeText={setPhone}
                onFocus={()=>{
                  setIsInvalidPhone(false);
                  setErrPhone('');
                }}
                onBlur={()=>{
                  validatePhone(phone);
                }}
              />
              {isInvalidPhone ? (
                <View style={styles.invalidMessageContainer}>
                  <Text style={styles.invalidMessage}>{errPhone}</Text>
                </View>
              ) : (<></>)}
          </>
              
            
          ) : (
            <></>
          )}
          <TextInput
            placeholder="password"
            style={[styles.textInput, {borderColor: isInvalidPassword ? '#ff0000' : '#fff'}]}
            onChangeText={setPassword}
            secureTextEntry={true}
            onFocus={()=>{
              setIsInvalidPassword(false);
              setErrPassword('');
            }}
            onBlur={()=>{
              validatePassword(password);
            }}
          />
          {isInvalidPassword ? (
            <View style={styles.invalidMessageContainer}>
              <Text style={styles.invalidMessage}>{errPassword}</Text>
            </View>
          ) : (<></>)}

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
            <Text
              style={{ textAlign: "center", color: "white", fontSize: 15 }}
              onPress={onTapAuthenticate}
            >
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
    borderWidth: 0.5
  },
  body: { flex: 6, justifyContent: "center", alignItems: "center" },
  footer: { flex: 3 },
  textInputView: {
    borderBottomWidth: 1,
    width: 50,
    justifyContent: "center",
    alignContent: "center",
  },
  textInputText: {
    fontSize: 30,
  },
  invalidMessage: {
    color: '#ff0000',
    fontSize: 10,
  },
  invalidMessageContainer: {
    width: "80%",
    height: 30,
    paddingStart: 30,
    marginTop: 6,
    marginBottom: -14,
    justifyContent: 'flex-start',
  }
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
