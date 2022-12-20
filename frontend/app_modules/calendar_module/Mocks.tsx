/**
 * Mock planu zajęć
 */

import { useState, createContext } from "react";
import { AgendaEntry, DateData } from "react-native-calendars";

interface IMockContext {
  events : AgendaEntry[];
  setEvents : (x : AgendaEntry[]) => void;
}

export const AgendaMockContext = createContext<IMockContext>({
  events: [],
  setEvents: () => {return;}
});

interface Props {
  children?: React.ReactNode;
}

export const AgendaMockContextProvider: React.FC<Props> = ({ children }) => {
  const [customEvents, setCustomEvents] = useState<AgendaEntry[]>([]);
  return (<AgendaMockContext.Provider value = {{
                                                events : customEvents,
                                                setEvents: x => {setCustomEvents(x); console.log(customEvents);}
                                              }}>
    {children}
    </AgendaMockContext.Provider>)
}

export const getDayMock = (dayNum : number, dateStr : string) => {
    
  const evenWeek : [String, String, number][][] = [
    [
      ["Teoria grafów wykład", "9:15", 100],
      ["Teoria grafów ćwiczenia", "11:15", 100],
      ["Języki i paradygmaty programowania", "13:15", 100]
    ],
    [
      ["Języki formalne i techniki translacji wykład", "9:15", 100],
      ["Obliczenia naukowe wykład", "11:15", 100],
      ["Programowanie zespołowe", "18:55", 100],
    ],
    [
      ["Języki formalne i techniki translacji ćwiczenia", "9:15", 100],
      ["Obliczenia naukowe laboratoria", "11:15", 100],
      ["Języki i paradygmaty programowania laboratoria", "16:15", 100]
    ]
  ];

  if (dayNum >= 1 && dayNum <= 3) {
    return evenWeek[dayNum - 1].map(x => {
      const result : AgendaEntry = {
        name: x[1] + "|" + x[0],
        height: x[2],
        day: dateStr,
      }
      return result;
    });
  }

  return undefined;
}

export default AgendaMockContextProvider;