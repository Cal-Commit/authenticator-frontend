export const manageSuccess = (window, localStorage, data, navigate) => {
  if (
    !localStorage.getItem("referrer") ||
    !localStorage.getItem("durl") ||
    localStorage.getItem("referrer") === window.location.origin
  ) {
    return navigate("/redirects", {
      state: {
        durl: "/",
        token: data.token,
        role: data.role,
        fullName: data.fullName,
        repPts: data.reputationPoints,
        since: new Date(data.created_at).toDateString(),
      },
    });
  }

  return (window.location = `${localStorage.getItem(
    "referrer"
  )}sso-success?durl=${localStorage.getItem("durl")}&token=${
    data.token
  }&role=${data.role}&fullName=${data.fullName}&repPts=${
    data.reputationPoints
  }&since=${new Date(data.created_at).toDateString()}`);
};
