export const validateEmployeeData = ({
  name,
  address,
  department,
  status,
  age,
}) => {
  if (
    ![name, address, department, status].every(
      (item) => item && item.length > 0
    ) ||
    !["Full-Time", "Contract Employee", "Remote Location"].includes(status) ||
    age <= 0 ||
    age > 100
  ) {
    return false;
  } else {
    return true;
  }
};
