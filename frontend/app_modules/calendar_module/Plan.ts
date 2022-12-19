/**
 * Mock planu zajęć
 */

import { AgendaEntry, DateData } from "react-native-calendars";

const getMock = (date : DateData) => {
    
  const evenWeek : [String, String, number][][] = [
    [
      ["Teoria grafów wykład", "9:15", 1],
      ["Teoria grafów ćwiczenia", "11:15", 2],
      ["Języki i paradygmaty programowania", "13:15", 3]
    ],
    [
      ["Języki formalne i techniki translacji wykład", "9:15", 1],
      ["Obliczenia naukowe wykład", "11:15", 2],
      ["Programowanie zespołowe", "18:54", 3],
    ],
    [
      ["Języki formalne i techniki translacji ćwiczenia", "9:15", 1],
      ["Obliczenia naukowe laboratoria", "11:15", 2],
      ["Języki i paradygmaty programowania laboratoria", "16:15", 3]
    ]
  ];

  const scheduleEven : AgendaEntry[] = [
    
  ];

  for (let i = -15; i < 85; i++) {
    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    const strTime = timeToString(time);

    if (!items[strTime]) {
      items[strTime] = [];

      const numItems = Math.floor(Math.random() * 3 + 1);
      for (let j = 0; j < numItems; j++) {
        items[strTime].push({
          name: "Item for " + strTime + " #" + j,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          day: strTime,
        });
      }
    }
  }
}