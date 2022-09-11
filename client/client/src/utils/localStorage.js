export const getSavedEventIds = () => {
  const savedEventIds = localStorage.getItem("saved_events")
    ? JSON.parse(localStorage.getItem("saved_events"))
    : [];

  return savedEventIds;
};

export const saveeventIds = (eventIdArr) => {
  if (eventIdArr.length) {
    localStorage.setItem("saved_events", JSON.stringify(eventIdArr));
  } else {
    localStorage.removeItem("saved_events");
  }
};

export const removeeventId = (eventId) => {
  const savedEventIds = localStorage.getItem("saved_events")
    ? JSON.parse(localStorage.getItem("saved_events"))
    : null;

  if (!savedEventIds) {
    return false;
  }

  const updatedsavedEventIds = savedEventIds?.filter(
    (savedeventId) => savedeventId !== eventId
  );
  localStorage.setItem("saved_events", JSON.stringify(updatedsavedEventIds));

  return true;
};
