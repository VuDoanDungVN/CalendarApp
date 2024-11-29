import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import React from "react";

const PrivacyScreen = () => {
  const personalInfo = [
    "Name",
    "Email address",
    "Phone number",
    "Profile picture (if applicable)",
  ];

  const nonPersonalInfo = [
    "Device information (e.g., device model, operating system)",
    "Usage data (e.g., pages viewed, time spent on the app)",
    "Phone number",
    "Location data (if permission is granted)",
  ];

  const usageInfo = [
    "Provide and manage the services of Event Okinawa.",
    "Notify you about upcoming events or changes.",
    "Improve the app's functionality and user experience.",
    "Communicate with you regarding your account or support requests.",
  ];

  const yourChoices = [
    "Access, update, or delete your personal information.",
    "Opt-out of certain tracking technologies.",
    "Withdraw consent for location tracking at any time via device settings.",
  ];
  const contactUs = [
    "Email: [vudungit92@gmail.com]",
    "Phone: [080-9852-8969]",
  ];

  const renderListItem = ({ item }: any) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.listItem}>{item}</Text>
    </View>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Privacy Policy</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Effective Date :</Text>
            <Text>21/12/2024</Text>
          </View>
          <View>
            <Text style={styles.text}>
              Event Okinawa our is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you use our application. Please read this policy
              carefully.
            </Text>
          </View>
          <View>
            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.text}>
              We may collect the following types of information:
            </Text>
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>
                1.1 Personal Information
              </Text>
              <FlatList
                data={personalInfo}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>
                1.2 Non-Personal Information
              </Text>
              <FlatList
                data={nonPersonalInfo}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>
                1.3 Cookies and Tracking
              </Text>
              <Text style={styles.listItem}>
                We may use cookies and similar tracking technologies to enhance
                your experience within the app.
              </Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>
                2. How We Use Your Information
              </Text>
              <Text style={styles.text}>We use your information to:</Text>
              <FlatList
                data={usageInfo}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View>
              <Text style={styles.sectionTitle}>
                3. How We Use Your Information
              </Text>
              <Text style={styles.text}>
                We use industry-standard security measures to protect your
                personal data from unauthorized access, disclosure, or misuse.
                However, no method of electronic transmission or storage is
                completely secure.
              </Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>
                4. Sharing Your Information
              </Text>
              <Text style={styles.text}>
                We do not sell or rent your personal information to third
                parties. However, we may share your data with:
              </Text>
              <FlatList
                data={usageInfo}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View>
              <Text style={styles.sectionTitle}>5. Your Choices</Text>
              <Text style={styles.text}>You have the right to:</Text>
              <FlatList
                data={yourChoices}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View>
              <Text style={styles.sectionTitle}>6. Third-Party Links</Text>
              <Text style={styles.text}>
                Our app may include links to third-party websites or services.
                We are not responsible for the privacy practices of these third
                parties.
              </Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>
                7. Changes to This Privacy Policy
              </Text>
              <Text style={styles.text}>
                We may update this Privacy Policy periodically. Changes will be
                notified through the app or via email, with the updated policy
                accessible within the app.
              </Text>
            </View>
            <View>
              <Text style={styles.sectionTitle}>
              8. Contact Us
              </Text>
              <Text style={styles.text}>
              If you have any questions about this Privacy Policy or your personal data, please contact us at:
              </Text>
              <FlatList
                data={contactUs}
                renderItem={renderListItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
  text: {
    color: "#90939D",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 5,
    color: "#22222",
  },
  subSection: {
    margin: 5,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#22222",
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },
  bulletPoint: {
    marginRight: 5,
    color: "#90939D",
  },
  listItem: {
    color: "#90939D",
  },
});

export default PrivacyScreen;
