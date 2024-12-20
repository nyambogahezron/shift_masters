import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileAccount = (navigation) => {
  const [Name, setName] = useState('Martin Wanjuru');
  const [EmployeeId, setEmployeeId] = useState('HM67L9');
  const [phoneNumber, setPhoneNumber] = useState('0789008874');
  const [cnic, setCnic] = useState('34567891');
  const [password, setPassword] = useState('password12345');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangesSaved, setIsChangesSaved] = useState(false);
  const handleSaveChanges = () => {
    // Perform necessary operations to save changes
    if (!Name || !phoneNumber || !cnic || !password) {
      alert('All fields are required.');
      return;
    } else if (cnic.length < 6 || cnic.length > 8) {
      alert('Please enter a valid 13 digit cnic number without dashes (-)');
      return;
    } else if (cnic.length !== 8) {
      alert('Please enter a valid 8 digit id number without dashes (-)');
      return;
    } else if (phoneNumber.length < 8) {
      alert('Please enter a valid 11 digits mobile number');
      return;
    } else if (phoneNumber.length > 10) {
      alert('Please enter a valid 11 digits mobile number');
      return;
    } else if (password.length < 8) {
      alert('Password should be at least 8 characters long!');
      return;
    } else {
      setIsChangesSaved(true);
      setIsEditMode(false);
    }
  };
  const hidePassword = () => {
    return '*'.repeat(password.length);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Employee ID:</Text>
          <Text style={styles.value}>{EmployeeId}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name:</Text>
          {isEditMode ? (
            <TextInput
              style={styles.input}
              value={Name}
              keyboardType='default'
              onChangeText={(text) => setName(text)}
            />
          ) : (
            <Text style={styles.value}>{Name}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          {isEditMode ? (
            <TextInput
              style={styles.input}
              value={phoneNumber}
              keyboardType='phone-pad'
              onChangeText={(text) => setPhoneNumber(text)}
            />
          ) : (
            <Text style={styles.value}>{phoneNumber}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{cnic}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          {isEditMode ? (
            <View style={styles.textinputcontainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyebutton}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color='black'
                />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.value}>{hidePassword()}</Text>
          )}
          {!isEditMode && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditMode(true)}
            >
              <Text style={styles.editButtonText}>Change Password</Text>
            </TouchableOpacity>
          )}
          {!isEditMode && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditMode(true)}
            >
              <Text style={styles.editButtonText}>Edit Changes</Text>
            </TouchableOpacity>
          )}
        </View>
        {isEditMode && (
          <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bf9000',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  value: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    secureTextEntry: 'text',
  },
  textinputcontainer: {
    borderColor: '#000000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  eyebutton: {
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: '#BF9000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#bf9000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileAccount;
