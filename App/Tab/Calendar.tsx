import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Agenda } from "react-native-calendars";
import { ContentData } from "../Data/DataList";

interface AgendaItem {
  name: string;
  description: string;
  time: string;
  location: string;
  tickets: string;
}

interface AgendaItems {
  [key: string]: AgendaItem[];
}

const CalendarScreen = ({ route }: any) => {
  const { selectedDate: initialSelectedDate } = route.params || {};
  const [items, setItems] = useState<AgendaItems>({});
  const [selectedDate, setSelectedDate] = useState(
    initialSelectedDate || new Date().toISOString().split("T")[0]
  );
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (initialSelectedDate) {
      onDayPress({ dateString: initialSelectedDate });
    } else {
      loadItemsForMonth(new Date()); // Gọi loadItemsForMonth khi vào từ Tab
    }
  }, [initialSelectedDate]);
  useEffect(() => {
    // Tạo đối tượng markedDates để đánh dấu ngày có sự kiện
    const newMarkedDates: { [key: string]: any } = {};
    ContentData.forEach((event) => {
      newMarkedDates[event.date] = {
        marked: true,
        dotColor: "#c02727",
      };
    });
    setMarkedDates(newMarkedDates);
  }, [ContentData]);

  const loadItemsForMonth = (month: any) => {
    const today = new Date().toISOString().split("T")[0];
    const newItems: AgendaItems = { ...items }; // Giữ lại các sự kiện đã có để không ghi đè

    ContentData.forEach((event) => {
      if (initialSelectedDate || event.date >= today) {
        // Nếu có ngày ban đầu hoặc từ ngày hôm nay
        const dateKey = event.date;
        if (!newItems[dateKey]) {
          newItems[dateKey] = [];
        }
        newItems[dateKey].push({
          name: event.eventName,
          description: event.eventDescription,
          time: event.time,
          location: event.location,
          tickets: event.ticketsGeneralAdmission,
        });
      }
    });

    setItems(newItems);
  };

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);

    const selectedDayEvents = ContentData.filter(
      (event) => event.date === day.dateString
    ).map((event) => ({
      name: event.eventName,
      description: event.eventDescription,
      time: event.time,
      location: event.location,
      tickets: event.ticketsGeneralAdmission,
    }));

    setItems({ [day.dateString]: selectedDayEvents });
  };

  const renderItem = (item: AgendaItem) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.description}</Text>
        <Text style={styles.itemText}>Thời gian: {item.time}</Text>
        <Text style={styles.itemText}>Địa điểm: {item.location}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>Không có sự kiện cho ngày này</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItemsForMonth}
        selected={selectedDate}
        onDayPress={onDayPress}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: "#456FE8" }, // Đánh dấu ngày được chọn
        }}
        theme={{
          selectedDayBackgroundColor: "#456FE8",
          todayTextColor: "#456FE8",
          arrowColor: "#456FE8",
          agendaDayTextColor: "#333",
          agendaDayNumColor: "#456FE8",
          agendaTodayColor: "#456FE8",
          agendaKnobColor: "#456FE8",
          backgroundColor: "#ccc",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  item: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyDate: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
});

export default CalendarScreen;
