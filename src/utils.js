const tranformBoolValue = (status) =>
    status.toLowerCase() === "active" ? true : false;

export { tranformBoolValue };
