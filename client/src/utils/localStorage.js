export const getSavedmomentIds = () => {
  const savedmomentIds = localStorage.getItem("saved_moments")
    ? JSON.parse(localStorage.getItem("saved_moments"))
    : [];

  return savedmomentIds;
};

export const saveMomentIds = (momentIdArr) => {
  if (momentIdArr.length) {
    localStorage.setItem("saved_moments", JSON.stringify(momentIdArr));
  } else {
    localStorage.removeItem("saved_moments");
  }
};

export const removemomentId = (momentId) => {
  const savedmomentIds = localStorage.getItem("saved_moments")
    ? JSON.parse(localStorage.getItem("saved_moments"))
    : null;

  if (!savedmomentIds) {
    return false;
  }

  const updatedSavedmomentIds = savedmomentIds?.filter(
    (savedmomentId) => savedmomentId !== momentId
  );
  localStorage.setItem("saved_moments", JSON.stringify(updatedSavedmomentIds));

  return true;
};
