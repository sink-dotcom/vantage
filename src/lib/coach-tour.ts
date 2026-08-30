import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function startCoachTour() {
  const tour = driver({
    showProgress: true,
    animate: true,
    overlayOpacity: 0.55,
    popoverClass: "vantage-tour",
    nextBtnText: "Next",
    prevBtnText: "Back",
    doneBtnText: "Done",
    steps: [
      {
        element: "#tour-progress",
        popover: {
          title: "Client progress at a glance",
          description:
            "Every coachee sits on the programme axis. Bigger, further-right bubbles are closer to finishing. Click one to open their file.",
        },
      },
      {
        element: "#tour-quick-actions",
        popover: {
          title: "Quick actions",
          description: "Book a session, add a coachee, log a note or set a goal without leaving the dashboard.",
        },
      },
      {
        element: "#tour-nudge",
        popover: {
          title: "Make the most out of Vantage",
          description: "Ask anything about your practice here and get a suggested next move.",
        },
      },
      {
        element: "#tour-upnext",
        popover: {
          title: "Up next",
          description: "Your running order for the week. Open the calendar for the full picture.",
        },
      },
      {
        element: "#tour-roster",
        popover: {
          title: "Roster health",
          description: "Progress bars and engagement sparklines flag who is drifting before the next session.",
        },
      },
    ],
  });

  tour.drive();
}
