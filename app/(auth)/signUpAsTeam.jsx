import * as React from 'react';
import { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useToast } from 'react-native-toast-notifications';
import { signUpUser } from '../../api';

const SignUpTeam = () => {
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [id, onChangeid] = useState('');
  const [number, onChangeNumber] = useState('');
  const [password, onChangePassword] = useState('');
  const [cnfrmpassword, onChangeCnfrmPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();
  const role = 'team';

  const handleSignUp = async () => {
    if (!name || !email || !number || !password || !cnfrmpassword) {
      setError('All fields are required.');
      return;
    } else if (id.length !== 8) {
      setError('Please enter a valid 8 digit id number without dashes(-)');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    } else if (number.length > 13) {
      setError('Please enter a valid 10 digits mobile number');
      return;
    } else if (password.length < 6) {
      setError('Password should be at least 6 characters long!');
      return;
    } else if (password !== cnfrmpassword) {
      setError('Passwords do not match.');
      return;
    }

    const res = await signUpUser({
      name,
      email,
      phone: number,
      role,
      password,
      idNumber: id,
    });

    if (res.error) {
      toast.show(`${res.error}`, {
        type: 'danger',
        placement: 'top',
        duration: 2500,
        offset: 30,
        animationType: 'zoom-in',
      });
    }

    if (res) {
      router.push('signInAsTeam');
      toast.show('Created successfully', {
        type: 'success',
        placement: 'top',
        duration: 2500,
        offset: 30,
        animationType: 'zoom-in',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/HOUSE-MOVERS-LOGO.png')}
        />
        <View style={styles.container2}>
          <TouchableOpacity
            style={styles.segmentButton}
            onPress={() => router.push('signInAsTeam')}
          >
            <Text style={styles.segmentButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentButton, styles.activeSegmentButton]}
            onPress={() => router.push('signUpAsTeam')}
          >
            <Text
              style={[styles.segmentButtonText, styles.activeSegmentButtonText]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputname}
          value={name}
          placeholder='Enter Name'
          placeholderTextColor='black'
          keyboardType='default'
          onChangeText={onChangeName}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputemail}
          value={email}
          placeholder='Enter Email'
          placeholderTextColor='black'
          keyboardType='email-address'
          onChangeText={onChangeEmail}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputnumber}
          value={id}
          placeholder='Enter id without dashes - '
          placeholderTextColor='black'
          keyboardType='phone-pad'
          onChangeText={onChangeid}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputnumber}
          value={number}
          placeholder='Enter Mobile Number'
          placeholderTextColor='black'
          keyboardType='phone-pad'
          onChangeText={onChangeNumber}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputpassword}
          value={password}
          placeholder='Enter Password'
          placeholderTextColor='black'
          keyboardType='default'
          secureTextEntry={true}
          onChangeText={(text) => onChangePassword(text)}
          clearButtonMode={'always'}
        />
        <TextInput
          style={styles.inputpassword2}
          value={cnfrmpassword}
          placeholder='Confirm Password'
          placeholderTextColor='black'
          keyboardType='default'
          secureTextEntry={true}
          onChangeText={(text) => onChangeCnfrmPassword(text)}
          clearButtonMode={'always'}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable
          style={({ pressed }) => [
            styles.buttonSignUp,
            pressed && { opacity: 1.8, backgroundColor: '#987200' },
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonSignUpText}> Sign Up </Text>
        </Pressable>
        <Text style={styles.ss}>
          {' '}
          If Already have an account?{' '}
          <Text
            style={styles.ff}
            onPress={() => {
              router.push('/signInAsTeam');
            }}
          >
            SignIn to Account!
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpTeam;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 0,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    resizeMode: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 270,
    marginTop: -50,
    marginLeft: 15,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container2: {
    flexDirection: 'row',
    backgroundColor: '#bf9000',
    borderColor: '#000000',
    borderWidth: 1,
    overflow: 'hidden',
    width: 300,
    borderRadius: 25,
    marginHorizontal: 1,
    marginTop: -45,
    marginBottom: 10,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeSegmentButton: {
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  segmentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeSegmentButtonText: {
    color: '#bf9000',
  },
  inputname: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  inputemail: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  inputnumber: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  inputpassword: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  inputpassword2: {
    height: 40,
    width: 300,
    borderRadius: 15,
    borderColor: '#000000',
    color: 'black',
    margin: 12,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 10,
  },
  buttonSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000000',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: 300,
    padding: 10,
    backgroundColor: '#BF9000',
    marginTop: 10,
  },
  buttonSignUpText: {
    color: '#000000',
    alignItems: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  ss: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginTop: 15,
  },
  ff: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 12,
    alignSelf: 'center',
    padding: 10,
  },
});
