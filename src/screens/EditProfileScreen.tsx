import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
} from "react-native";
import { connect } from "react-redux";
import {
  ApplicationState,
	onEditProfile,
  UserState
} from "../redux";

import { ButtonWithTitle } from "../components";

interface EditProfileScreenProps {
  userReducer: UserState;
	onEditProfile: Function,
	navigation: {goBack: Function, getParam: Function}
}

const _EditProfileScreen: React.FC<EditProfileScreenProps> = (props) => {

  const { user } = props.userReducer;

	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');

	const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
  const [errFirstName, setErrFirstName] = useState('');
  const [isInvalidLastName, setIsInvalidLastName] = useState(false);
  const [errLastName, setErrLastName] = useState('');

	const validateFirstName = (firstName: string) => {
    // if (firstName === undefined || firstName === ''){
    //   setIsInvalidFirstName(true);
    //   setErrFirstName('Không được để trống')
    // }
		const oldFirstName = user.firstName || '';
		if (firstName === oldFirstName){
      setIsInvalidFirstName(true);
      setErrFirstName('Tên không thay đổi')
			return true
		}
		return false
  };
	const validateLastName = (lastName: string) => {
    // if (lastName === undefined || lastName === ''){
    //   setIsInvalidLastName(true);
    //   setErrLastName('Không được để trống')
    // }
		const oldLastName = user.lastName || '';
		if (lastName === oldLastName){
			  setIsInvalidLastName(true);
			  setErrLastName('Họ không thay đổi')
				return true
		}
		return false
  };

	const onTapSaveButton = () => {
		if (!validateFirstName(firstName) || !validateLastName(lastName)){
			props.onEditProfile(user, firstName, lastName);
			props.navigation.goBack();
		}
		
	}

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
				<Image
					source={require("../images/avatar.png")}
					style={{ width: 200, height: 200, marginRight: 20 }}
				/>
      </View>
			<View style={styles.body}>
				<View style={styles.row}>
					{/* Họ */}
					<View style={{width: '100%', alignItems: 'center'}}>
						<View style={{position: 'absolute', marginLeft: 68,
							paddingHorizontal: 3, // Amount of spacing between border and first/last letter
							zIndex: 1, // Label must overlap border
							// elevation: 1, // Needed for android
							// shadowColor: "white", // Same as background color because elevation: 1 creates a shadow 
							alignSelf: "flex-start", // Have View be same width as Text inside,
							backgroundColor: "#F2F2F2" 
							}}>
							<Text style={{fontWeight: '400', fontSize: 14}}>
								HỌ
							</Text>
						</View>
						<TextInput
							placeholder="Nguyễn Thị"
							style={[styles.textInput, {marginTop: 10, borderColor: isInvalidLastName ? '#eeaf14' : '#000'}]}
							onChangeText={setLastName}
							onFocus={()=>{
								setIsInvalidLastName(false);
								setErrLastName('');
							}}
							onBlur={()=>{
								(validateLastName(lastName));
							}}
						/>
						{isInvalidLastName ? (
							<View style={styles.invalidMessageContainer}>
								<Text style={styles.invalidMessage}>{errLastName}</Text>
							</View>
						) : (<></>)}
					</View>
				</View>

				<View style={styles.row}>
					{/* Tên */}
					<View style={{width: '100%', alignItems: 'center'}}>
						<View style={{position: 'absolute', marginLeft: 68,
							paddingHorizontal: 3, // Amount of spacing between border and first/last letter
							zIndex: 1, // Label must overlap border
							// elevation: 1, // Needed for android
							// shadowColor: "white", // Same as background color because elevation: 1 creates a shadow 
							alignSelf: "flex-start", // Have View be same width as Text inside,
							backgroundColor: "#F2F2F2" 
							}}>
							<Text style={{fontWeight: '400', fontSize: 14}}>
								TÊN
							</Text>
						</View>
						<TextInput
							placeholder="Thiên Trang"
							style={[styles.textInput, {marginTop: 10, borderColor: isInvalidFirstName ? '#eeaf14' : '#000'}]}
							onChangeText={setFirstName}
							onFocus={()=>{
								setIsInvalidFirstName(false);
								setErrFirstName('');
							}}
							onBlur={()=>{
								(validateFirstName(firstName));
							}}
						/>
						{isInvalidFirstName ? (
							<View style={styles.invalidMessageContainer}>
								<Text style={styles.invalidMessage}>{errFirstName}</Text>
							</View>
						) : (<></>)}
					</View>
					
				</View>

				<View style={[styles.row, {width: '50%'}]}>
					<ButtonWithTitle title="Lưu" width={120} height={50} onTap={()=>{onTapSaveButton()}} />
				</View>
			</View>

			<View style={styles.footer}>
				
			</View>

      
    </View>
  );
 
  
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F2" },
  navigation: {
    flex: 4,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  body: { flex: 3, display: "flex", alignItems: 'center', justifyContent: 'flex-start'  },
	footer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20
	},
	row: {
		width: '100%',
		height: 50,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		margin: 16
	},
  textInput: {
    width: "80%",
    height: 50,
    padding: 10,
    paddingStart: 30,
    marginTop: 20,
    borderRadius: 30,
    // backgroundColor: "#fff",
    borderWidth: 0.5
  },
  invalidMessage: {
    color: '#eeaf14',
    fontSize: 10,
  },
  invalidMessageContainer: {
    width: "80%",
    height: 30,
    paddingStart: 30,
    marginTop: 6,
    marginBottom: -14,
    justifyContent: 'flex-start',
  },
  icon: {
    width: 115,
    height: 80,
  },
});

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const EditProfileScreen = connect(mapStateToProps, { onEditProfile })(
  _EditProfileScreen
);

export { EditProfileScreen };
