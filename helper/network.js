const getData = async (path, auth) => {
  const requestOptions = {
    headers: {
      "ngrok-skip-browser-warning": "69",
      "Content-Type": "application/json",
      Authorization: auth,
    },
  };

  const response = await fetch(path, requestOptions);
  const data = await response.json();
  return {
    ok: response.ok,
    data,
  };
};

export { getData as get };
