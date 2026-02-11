const STORAGE_KEY = "secure_test_event_queue";

//  Save events locally

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

//  Load persisted events

export function loadEvents() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Clear persisted events after successful submission

export function clearEvents() {
  localStorage.removeItem(STORAGE_KEY);
}
