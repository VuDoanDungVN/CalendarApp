import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Bước 1
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>(""); // Bước 2
  const [password, setPassword] = useState<string>(""); // Bước 3
  const [confirmPassword, setConfirmPassword] = useState(""); // Bước 3
  const [errorMessage, setErrorMessage] = useState<string>(""); // Bước 4
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // Lấy ra mật khẩu và hiển thị nó
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

  // Gửi mail xác thực
  const sendVerificationEmail = async (user: any) => {
    try {
      await sendEmailVerification(user);
      Alert.alert(
        "Xác Thực Email",
        "Một email xác thực đã được gửi đến hòm thư của bạn. Vui lòng kiểm tra email."
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    }
  };

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Bạn chưa điền đầy đủ thông tin.");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Email không đúng định dạng.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Mật khẩu cần ít nhất 6 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Mật khẩu không khớp.");
      return;
    }

    setIsLoading(true); // Bắt đầu trạng thái tải

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendVerificationEmail(user);

      console.log("Đã gửi mail xác thực");
      Alert.alert(
        "Đăng ký thành công!",
        "Vui lòng kiểm tra email và xác thực trước khi đăng nhập."
      );
      navigation.replace("LoginScreen");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during account creation:", error.message);
        Alert.alert("Error", error.message);
      } else {
        console.error("Unknown error during account creation");
        Alert.alert("Error", "An unknown error occurred.");
      }
    } finally {
      setIsLoading(false); // Kết thúc trạng thái tải
    }
  };

  //Hiển thị mật khẩu đã nhập
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="mail"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Bổ sung thuộc tính secureTextEntry để ẩn mật khẩu
            style={styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#9d9d9d"
            style={styles.icon}
          />
          <TextInput
            placeholder="Comfirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!isPasswordVisible} // Bổ sung thuộc tính secureTextEntry để ẩn mật khẩu
            style={styles.textInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialIcons
              name={isPasswordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#9d9d9d"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.registerText}>
              Already have account?{" "}
              <Text style={styles.registerLink}>Đăng ký</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#5F5F5F",
    fontSize: 25,
    fontWeight: "600",
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
    gap: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  registerContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  registerText: {
    color: "#5F5F5F",
  },
  registerLink: {
    color: "#456FE8",
    fontWeight: "600",
  },
  signUpButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  errorMessageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
  },
});
