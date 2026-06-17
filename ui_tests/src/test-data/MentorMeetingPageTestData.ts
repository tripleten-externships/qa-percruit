// Test data for Mentor Meeting Page 

//Test data for student names to be used in meeting scheduling tests. This can be expanded with more names as needed.
export const studentNames = ['Bhargavi Bommu', 'Bhargavi2 Bommu2', 'Bhargavi3 Bommu3', 'Bhargavi4 Bommu4'];

export function getRandomStudentName() {
  return studentNames[Math.trunc(Math.random() * studentNames.length)];
}

//Test data for meeting titles to be used in meeting scheduling tests. This can be expanded with more titles as needed.
export const meetingTitles = ['Project Discussion', 'Career Guidance', 'Technical Interview Prep', 'Resume Review'];
export function getRandomMeetingTitle() {
  return meetingTitles[Math.trunc(Math.random() * meetingTitles.length)];
}

//Test data for meeting descriptions to be used in meeting scheduling tests. This can be expanded with more descriptions as needed.
export const meetingDescriptions = [
  'Discuss project requirements and next steps.', 'Provide guidance on career development and growth.',
  'Prepare for upcoming technical interviews with mock questions and feedback.', 'Review resume and provide suggestions for improvement.'
];
export function getRandomMeetingDescription() {
  return meetingDescriptions[Math.trunc(Math.random() * meetingDescriptions.length)];
}

//Test data for meeting types to be used in meeting scheduling tests. This can be expanded with more types as needed.
export const meetingTypes = ['Initial Meeting', 'Regular Check-in', 'Crisis Support', 'Quick Check-in', 'Final Meeting'];
export function getRandomMeetingType() {
  return meetingTypes[Math.trunc(Math.random() * meetingTypes.length)];
}

//Test data for meeting Duration to be used in meeting scheduling tests. This can be expanded with more durations as needed.
//values are number of minutes for the meeting duration dropdown in the UI
export const meetingDurations = [15, 30, 45, 60, 75, 90, 105, 120];
export function getRandomMeetingDuration() {
  return meetingDurations[Math.trunc(Math.random() * meetingDurations.length)];
}

// Generate test data for meeting date and time selection. This function creates a random date and time for scheduling meetings, ensuring that the selected date is in the future and falls within typical working hours (9 AM to 5 PM).
export function getRandomFutureDateTime() {
  const now = new Date();
  const futureDate = new Date(now.getTime() + Math.random() * (30 * 24 * 60 * 60 * 1000)); // Random date within the next 30 days
  // Ensure the time falls within typical working hours (9 AM to 5 PM)
  futureDate.setHours(9 + Math.floor(Math.random() * 8), Math.floor(Math.random() * 60), 0, 0);
  console.log(`Future Date generated randomly: ${futureDate}`)
  return futureDate;
  // const futureDate = 'Tue Mar 24 2026 12:17:00 GMT-0500 (Central Daylight Time)' //Example to manually change the value for debugging
  // return futureDate 
}