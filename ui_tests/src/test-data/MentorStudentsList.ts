// Test data for Mentor Students List
export const studentNames = ['Bhargavi Bommu', 'Bhargavi2 Bommu2', 'Bhargavi3 Bommu3', 'Bhargavi4 Bommu4'];

export function getRandomStudent() {
  return studentNames[Math.trunc(Math.random() * studentNames.length)];
}

