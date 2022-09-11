export const getSavedEventIds = () => {
  const savedEventIds = localStorage.getItem("saved_events")
    ? JSON.parse(localStorage.getItem("saved_events"))
    : [];

  return savedEventIds;
};

export const saveEventIds = (eventIdArr) => {
  if (eventIdArr.length) {
    localStorage.setItem("saved_events", JSON.stringify(eventIdArr));
  } else {
    localStorage.removeItem("saved_events");
  }
};

export const removeEventId = (eventId) => {
  const savedEventIds = localStorage.getItem("saved_events")
    ? JSON.parse(localStorage.getItem("saved_events"))
    : null;

  if (!savedEventIds) {
    return false;
  }

  const updatedSavedEventIds = savedEventIds?.filter(
    (savedEventId) => savedEventId !== eventId
  );
  localStorage.setItem("saved_events", JSON.stringify(updatedSavedEventIds));

  return true;
};
