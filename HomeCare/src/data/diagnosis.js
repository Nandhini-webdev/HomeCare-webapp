export const diagnosisRules = {
  "Not cooling": { issue: "Cooling system issue", check: "Check whether the power is on and the air vents are not blocked.", advice: "If cooling is still weak, book a technician. Avoid opening the appliance." },
  "Water leakage": { issue: "Drainage / seal issue", check: "Look for a visible loose hose or blocked drain area.", advice: "Keep the area dry and book service if the leak continues." },
  "Not turning on": { issue: "Power supply issue", check: "Check the plug, socket and main switch.", advice: "Do not open electrical panels. Book a technician if power is available but the appliance stays off." },
  "Unusual noise": { issue: "Mechanical / vibration issue", check: "Check whether the appliance is stable and not touching another object.", advice: "Stop using it if the noise is severe and request service." },
  "Not spinning": { issue: "Motor / load issue", check: "Check for an overloaded or uneven load.", advice: "If it still does not spin, technician inspection is recommended." },
  "Not draining": { issue: "Drainage blockage", check: "Check the visible drain hose for kinks or blockage.", advice: "Do not dismantle the pump. Book service if the problem continues." },
  "No display": { issue: "Display / power issue", check: "Check the power connection and remote batteries.", advice: "If the TV has power but no display, request a technician." },
  "No sound": { issue: "Audio setting / hardware issue", check: "Check mute, volume and audio output settings.", advice: "If settings are correct, book a technician." },
  "Not heating": { issue: "Heating element issue", check: "Check that the appliance is receiving power and the correct mode is selected.", advice: "Do not open the electrical section. Book service if it remains cold." },
  "Bad taste": { issue: "Filter / purification issue", check: "Check whether the filter is due for replacement.", advice: "Use the appliance only as recommended and book filter service." },
  "Water flow low": { issue: "Filter / inlet flow issue", check: "Check the inlet connection and filter condition.", advice: "A technician can test the filter and water pressure." },
  "Leakage": { issue: "Seal / pipe issue", check: "Check visible connections for loose fittings.", advice: "Turn off water supply if the leak is significant and book service." },
  "General service": { issue: "Routine maintenance", check: "Check the appliance exterior, power and visible connections.", advice: "Book a routine service for cleaning and preventive maintenance." }
};

export function diagnose(problem) {
  return diagnosisRules[problem] || {
    issue: "Needs inspection",
    check: "Describe the symptoms clearly and do only safe visual checks.",
    advice: "A technician can inspect the appliance and identify the exact cause."
  };
}
