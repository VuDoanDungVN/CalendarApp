import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Bước 1

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>(""); // Bước 2
  const [password, setPassword] = useState<string>(""); // Bước 3
  const [errorMessage, setErrorMessage] = useState<string>(""); // Bước 4
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false); // Lấy ra mật khẩu và hiển thị nó

  const handleLogin = () => {
    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Email không đúng định dạng.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    // Bước 5: Kiểm tra thông tin đăng nhập
    if (!email || !password) {
      setErrorMessage("Bạn chưa điền đầy đủ thông tin.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    // Gọi hàm đăng nhập từ Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Kiểm tra xem email đã được xác thực hay chưa
        if (user.emailVerified) {
          setErrorMessage(""); // Xóa lỗi nếu đăng nhập thành công
          navigation.replace("HomeScreen"); // Chuyển tới màn hình chính sau khi đăng nhập thành công
        } else {
          setErrorMessage("Email của bạn chưa được xác thực.");
          setTimeout(() => setErrorMessage(""), 5000);
          // Sign out the user to prevent unauthorized access
          auth.signOut(); // Đăng xuất nếu email chưa xác thực
        }
      })
      .catch((error) => {
        // Xử lý lỗi từ Firebase và hiển thị thông báo
        if (error.code === "auth/invalid-email") {
          setErrorMessage("Email không hợp lệ.");
          setTimeout(() => setErrorMessage(""), 3000);
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("Mật khẩu không chính xác.");
          setTimeout(() => setErrorMessage(""), 3000);
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("Email hoặc mật khẩu không chính xác.");
          setTimeout(() => setErrorMessage(""), 3000);
        } else {
          setErrorMessage(
            "Tài khoản của bạn đã bị band vì hành vi không chuẩn mực. "
          );
          setTimeout(() => setErrorMessage(""), 5000);
        }
      });
  };

  //Hiển thị mật khẩu đã nhập
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
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
            onSubmitEditing={handleLogin}
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
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.registerLink}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  loginButton: {
    backgroundColor: "#456FE8",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonText: {
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
