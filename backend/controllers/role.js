import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("incomplete data");

  const existingRole = await role.findOne({ name: req.body.name });
  if (existingRole) return res.status(400).send("the role already exist");

  const roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const result = await roleSchema.save();

  if (!result) return res.status(400).send("failed to register role");

  return res.status(200).send({ result });
};

const listRole = async (req, res) => {
  const allRoles = await role.find();

  if (allRoles.length == 0) return res.status(400).send("Empty role list");

  return res.status(200).send({ allRoles });
};

const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("incomplete data");

  const existingRole = await role.findOne({
    name: req.body.name,
    description: req.body.description,
  });
  if (existingRole) return res.status(400).send("the role already exist");

  const roleUpdate = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !roleUpdate
    ? res.status(400).send("Error editing role")
    : res.status(200).send("role Updated");
};

const deleteRole = async (req, res) => {
  const roleDelete = await role.findByIdAndDelete({ _id: req.params["_id"] });

  return !roleDelete
    ? res.status(400).send("Role no found")
    : res.status(200).send("Roledeleted");
};

const findRole = async (req, res) => {
  const roleId = await role.findById({_id: req.params["_id"]});
  return !roleId
  ? res.status(400).send("no search results")
  :res.status(200).send({ roleId });
};

export default { registerRole, listRole, updateRole, deleteRole, findRole };
