import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { Agenda } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (initialSelectedDate) {
      onDayPress({ dateString: initialSelectedDate });
    } else {
      loadItemsForMonth(new Date());
    }
  }, [initialSelectedDate]);

  useEffect(() => {
    const newMarkedDates: { [key: string]: any } = {};
    ContentData.forEach((event) => {
      newMarkedDates[event.date] = {
        marked: true,
        dotColor: "#c02727",
      };
    });
    setMarkedDates(newMarkedDates);
  }, [ContentData]);

  useFocusEffect(
    useCallback(() => {
      if (!initialSelectedDate) {
        loadItemsForMonth(new Date());
      }
    }, [initialSelectedDate])
  );

  const loadItemsForMonth = (month: any) => {
    const startOfMonth = new Date(month.year, month.month - 1, 1);
    const endOfMonth = new Date(month.year, month.month, 0);
    const monthKey = `${month.year}-${month.month}`; // Sử dụng monthKey để đánh dấu tháng đã tải dữ liệu

    // Nếu tháng đã có dữ liệu, không tải lại
    if (items[monthKey]) return;

    const today = new Date().toISOString().split("T")[0];
    const newItems: AgendaItems = { ...items };

    ContentData.forEach((event) => {
      if (initialSelectedDate || event.date >= today) {
        const dateKey = event.date;
        if (!newItems[dateKey]) {
          newItems[dateKey] = [];
        }
        if (
          !newItems[dateKey].some(
            (item) => item.name === event.eventName && item.time === event.time
          )
        ) {
          newItems[dateKey].push({
            name: event.eventName,
            description: event.eventDescription,
            time: event.time,
            location: event.location,
            tickets: event.ticketsGeneralAdmission,
          });
        }
      }
    });

    // Thêm các ngày trống trong tháng
    for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split("T")[0];
      if (!newItems[dateKey]) {
        newItems[dateKey] = [];
      }
    }

    setItems(newItems);
  };

  const onDayPress = (day: any) => {
    if (day.dateString !== selectedDate) {
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
    }
  };

  const renderItem = (item: AgendaItem) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.itemText}>
          {item.description}
        </Text>
        <Text style={styles.itemText}>{item.time}</Text>
        <Text style={styles.itemText}>{item.location}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>データがありません</Text>
      </View>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadItemsForMonth(new Date());
    setIsRefreshing(false);
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
          [selectedDate]: { selected: true, selectedColor: "#456FE8" },
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        theme={{
          selectedDayBackgroundColor: "#456FE8",
          todayTextColor: "#456FE8",
          arrowColor: "#456FE8",
          agendaDayTextColor: "#333",
          agendaDayNumColor: "#456FE8",
          agendaTodayColor: "#456FE8",
          agendaKnobColor: "#456FE8",
          backgroundColor: "#ccc",
          borderRadius: 15,
          borderWidth: 0.5,
          borderColor: "#ccc",
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
