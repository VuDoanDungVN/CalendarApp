import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import { ContentData } from "../Data/DataList";

interface AgendaItem {
  name: string;
  description: string;
  time: string;
  location: string;
  eventImage: string;
  ticketsGeneralAdmission: string;
  ticketsChildren: string;
  howToGetThere: string;
  additionalInfo: string;
}

interface AgendaItems {
  [key: string]: AgendaItem[];
}

const CalendarScreen = ({ route, navigation }: any) => {
  const { selectedDate: initialSelectedDate } = route.params || {};
  const [items, setItems] = useState<AgendaItems>({});
  const [selectedDate, setSelectedDate] = useState(
    initialSelectedDate || new Date().toISOString().split("T")[0]
  );
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadedMonths = new Set();

  useEffect(() => {
    if (initialSelectedDate) {
      onDayPress({ dateString: initialSelectedDate });
    } else {
      const currentDate = new Date();
      loadItemsForMonth({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      });
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
        const currentDate = new Date();
        loadItemsForMonth({
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
        });
      }
    }, [initialSelectedDate])
  );

  const loadItemsForMonth = (month: any) => {
    const monthKey = `${month.year}-${month.month}`;
    if (loadedMonths.has(monthKey)) return;

    loadedMonths.add(monthKey);

    const startOfMonth = new Date(month.year, month.month - 1, 1);
    const endOfMonth = new Date(month.year, month.month, 0);
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
            description: event.description,
            time: event.time,
            eventImage: event.eventImage,
            location: event.location,
            ticketsGeneralAdmission: event.ticketsGeneralAdmission,
            ticketsChildren: event.ticketsChildren,
            howToGetThere: event.howToGetThere,
            additionalInfo: event.additionalInfo,
          });
        }
      }
    });

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

      const selectedDate = new Date(day.dateString);
      const endOfNextMonth = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 2,
        0
      );
      const newItems: AgendaItems = { ...items };

      ContentData.forEach((event) => {
        const eventDate = new Date(event.date);

        if (eventDate >= selectedDate && eventDate <= endOfNextMonth) {
          const dateKey = event.date;

          if (!newItems[dateKey]) {
            newItems[dateKey] = [];
          }

          if (
            !newItems[dateKey].some(
              (item) =>
                item.name === event.eventName && item.time === event.time
            )
          ) {
            newItems[dateKey].push({
              name: event.eventName,
              description: event.description,
              time: event.time,
              eventImage: event.eventImage,
              location: event.location,
              ticketsGeneralAdmission: event.ticketsGeneralAdmission,
              ticketsChildren: event.ticketsChildren,
              howToGetThere: event.howToGetThere,
              additionalInfo: event.additionalInfo,
            });
          }
        }
      });

      for (
        let d = new Date(day.dateString);
        d <= endOfNextMonth;
        d.setDate(d.getDate() + 1)
      ) {
        const dateKey = d.toISOString().split("T")[0];
        if (!newItems[dateKey]) {
          newItems[dateKey] = [];
        }
      }

      setItems(newItems);
    }
  };

  const renderItem = (item: AgendaItem) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen", { item })}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.description}
          </Text>
          <Text style={styles.itemImage}>{item.eventImage}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
          <Text style={styles.itemText}>{item.location}</Text>
          <Text style={styles.itemText}>{item.ticketsGeneralAdmission}</Text>
          <Text style={styles.itemText}>{item.ticketsChildren}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.howToGetThere}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.additionalInfo}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>イベントがありません</Text>
      </View>
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    const currentDate = new Date();
    loadItemsForMonth({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    });
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
          backgroundColor: "#f0f0f0",
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
  itemImage: {
    opacity: 0,
  },
  itemTime: {
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
