import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { TextField } from '../components'
import { ButtonWithTitle } from '../components/ButtonWithTitle';
import { connect } from 'react-redux';
import { ApplicationState, onUserLogin, onUserSignup, UserState, onVerifyOTP, onOTPRequest} from '../redux';
import { useNavigation } from '../utils';

interface LoginProps{ 
    onUserLogin: Function,
    onUserSignup: Function,
    userReducer: UserState,
    onVerifyOTP: Function,
    onOTPRequest: Function,
    navigation: { getParam: Function, goBack: Function}
 }

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignup, userReducer, onVerifyOTP, onOTPRequest, navigation }) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)
    
    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(true)
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a New OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(false)

    let countDown: any

    const {user} = userReducer

    // const {navigate} = useNavigation()
    const {goBack} = navigation;

    useEffect(()=>{
        setVerified(user.verified)
        if (user._id !== undefined){
            if (!user.verified){
                // OTP Page
            }else{
                // Back Page
                goBack();
            }
        }else{

        }

        // if (user.token !== undefined){
            
        //     if (user.verified === true){
        //         //navigate to Cart Page
        //         navigate('CartPage')
        //     }else{
        //         setVerified(user.verified)
        //         //check for start timer
        //         onEnableOtpRequest()
        //     }
        // }else{
        //     setVerified(user.verified)
        // }

        return ()=>{
            clearInterval(countDown);
        }
    }, [user])

    const onTapOptions = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? 'Signup' : 'Login')
    }

    const onTapAuthenticate = () => {

        if(isSignup){
           onUserSignup(email, phone, password);
        }else{
            onUserLogin(email, password)
            console.log('logingin')
        }

    }

    const onEnableOtpRequest = ()=>{
        const otpDate = new Date();
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000));
        const otpTime = otpDate.getTime();

        countDown = setInterval(()=>{
            const currentTime = new Date().getTime();

            const totalTime = otpTime - currentTime;

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((totalTime % (1000 * 60)) / (1000));

            setRequestOtpTitle(`Request a New OTP in ${minutes}:${seconds}`);

            if (minutes < 1 && seconds < 1){
                setRequestOtpTitle('Request a New OTP');
                setCanRequestOtp(true);
                clearInterval(countDown);
            }
        }, 1000)
    }

    const onTapVerify = ()=>{
        onVerifyOTP(otp, user)
    }

    const onTapRequestNewOTP = ()=>{
        setCanRequestOtp(false);
        onOTPRequest(user);
    }



    if (user._id !== undefined && !verified){
        //show OTP Page
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    
                    <Image source={require('../images/verify_otp.png')}
                        style={{width: 120, height:120, margin: 20}}
                    />
                    <Text style={{fontSize: 22, fontWeight: '500', margin: 10}}>Verification</Text>
                    <Text style={{fontSize: 16, padding: 10, marginBottom: 20, color: '#716F6F'}}>Enter your OTP sent to your mobile number</Text>
                    <TextField isOTP={true} placeholder='OTP' onTextChange={setOtp}/>

                    <ButtonWithTitle title='Verify OTP' onTap={onTapVerify} width={340} height={50}/>
                    <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} 
                        onTap={onTapRequestNewOTP} width={430} height={50}/>
        
                </View>
                <View style={styles.footer}></View>
            </View>
        )
        
    }else{
        return (
            <View style={styles.container}>
                <View style={styles.navigation}><Text style={{ fontSize: 30, fontWeight: '400'}}>{title}</Text></View>
                <View style={styles.body}>
                    
                    <TextField placeholder="Email ID" onTextChange={setEmail} isSecure={false} />
        
                    {isSignup && <TextField placeholder="Phone Number" onTextChange={setPhone} isSecure={false} />}
                    <TextField placeholder="Password" onTextChange={setPassword} isSecure={true} />
        
                    <ButtonWithTitle title={title} height={50} width={350} onTap={onTapAuthenticate} />
                    
                    <ButtonWithTitle 
                        title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} 
                        height={50}
                        width={350} 
                        onTap={onTapOptions} 
                        isNoBg={true} 
                    />
        
                </View>
                <View style={styles.footer}></View>
            </View>)
    }
}
    



const styles = StyleSheet.create({
container: { flex: 1,},
navigation: { flex: 3, justifyContent: 'center', paddingLeft: 30},
body: { flex: 6, justifyContent: 'center', alignItems: 'center'},
footer: { flex: 3,  }
})

 
const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignup, onVerifyOTP, onOTPRequest})(_LoginScreen)

 export { LoginScreen }