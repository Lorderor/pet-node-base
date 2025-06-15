const users = [
  { id: 1, name: `Vasa` },
  { id: 2, name: `Kola` },
];

export const getUsers = (req, res) => {
  const params = req.params;
  if (params.id) {
    return res.send(users.find((val) => String(val.id) === params.id));
  }
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.send(users);
};
