import React, { useState, useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "CalendarScreen">;

//TODO: dodaj wyświetlanie planu dnia i wydarzeń z użyciem Agendy.

export const CalendarScreen: React.FC<Props> = () => {
  return (
    <Calendar 
      style={styles.calendar}
      minDate={"2022-01-01"}
      maxDate={"2032-01-01"}
      theme={calendarTheme}
      hideArrows={false}
    />
  );
};

LocaleConfig.locales['polish'] = {
  monthNames: [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień'
  ],
  monthNamesShort: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
  dayNames: ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'],
  dayNamesShort: ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'niedz.'],
  today: "Dzisiaj"
};
LocaleConfig.defaultLocale = 'polish';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderColor: 'gray',
  }
});

const calendarTheme = {
  arrowColor: 'orange',
  indicatorColor: 'green',
}
