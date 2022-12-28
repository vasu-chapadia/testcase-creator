const KEYS = {
  test: "test",
  employeeId: "employeeId",
};

export const getOperationsCollection = () => [
  { id: "1", title: "None", value: "None" },
  { id: "2", title: "Equal To", value: "Equal To" },
  { id: "3", title: "Greater Than", value: "Greater Than" },
  { id: "4", title: "Contains", value: "Contains" },
  { id: "5", title: "In", value: "In" },
];

export function insertTest(data) {
  let test = getAllTest();
  console.log('test::',test,'data::',data);
  test.push(data);
  localStorage.setItem(KEYS.test, JSON.stringify(test));
}

export function updateTest(data) {
  let test = getAllTest();
  let recordIndex = test.findIndex((x) => x.id == data.id);
  test[recordIndex] = { ...data };
  localStorage.setItem(KEYS.test, JSON.stringify(test));
}

export function deleteTest(id) {
  let test = getAllTest();
  test = test.filter((x) => x.id != id);
  localStorage.setItem(KEYS.test, JSON.stringify(test));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) == null)
    localStorage.setItem(KEYS.employeeId, "0");
  var id = parseInt(localStorage.getItem(KEYS.employeeId));
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllTest() {
  const test = JSON.parse(
    localStorage.getItem(KEYS.test)
  );
  if (test) return test;
  // return [
  //   {
  //     id: 0,
  //     VariableName: "0",
  //     ValidationCriteria: "0",
  //     Operations: "Greater Than",
  //   },
  //   {
  //     id: 1,
  //     VariableName: "1",
  //     ValidationCriteria: "1",
  //     Operations: "1",
  //   },
  //   {
  //     id: 2,
  //     VariableName: "2",
  //     ValidationCriteria: "2",
  //     Operations: "2",
  //   },
  //   {
  //     id: 3,
  //     VariableName: "3",
  //     ValidationCriteria: "3",
  //     Operations: "3",
  //   },
  // ];
}
