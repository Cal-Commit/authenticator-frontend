export const fetchApi = async (slug, options = {}) => {
  options.cache = "no-cache";
  
  let url;
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:8081${slug}`;
  } else {
    url = `https://cal-commit-auth-test.onrender.com${slug}`;
  }

  return fetch(url, options);
};
