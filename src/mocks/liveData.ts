export const INBOX = [
  {
    from: "Omnixys",
    subject: "Welcome to Nexys",
    createdAt: "2026-02-01T09:30:00Z",
    status: "unread",
  },
  {
    from: "Finyx",
    subject: "Monthly report ready",
    createdAt: "2026-01-31T14:00:00Z",
    status: "read",
  },
] as const;

export const WEATHER = {
  location: "Berlin",
  tempC: 7,
  condition: "cloudy",
};

export const CALENDAR = [
  {
    start: "2026-02-01T09:00:00",
    titleKey: "dailyStandup",
  },
  {
    start: "2026-02-01T14:00:00",
    titleKey: "productReview",
  },
] as const;
