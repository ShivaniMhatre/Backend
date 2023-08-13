import User from '../Modals/User.modal.js';

export const Login = (req, res) => {
    res.send("Login from Controller")
}

export const Register = async (req, res) => {
    // console.log(req.body, "req.body")
    const { name, surname, age, email, number, password, confirmPassword } = req.body;
    if (!name) return res.send("Name is missing..");
    if (!surname) return res.send("Surname is missing..")
    if (!age) return res.send("Age is missing..")
    if (!email) return res.send("Email is required.")
    if (!number) return res.send("Number is required");
    if (!password) return res.send("Password is required");
    if (!confirmPassword) return res.send("Confirm password is required!")
    if (password !== confirmPassword) return res.send("Password and Confirm password not matched.")
    const user = new User({
        name: name,
        surname: surname,
        age: parseInt(age),
        email,
        number: parseInt(number),
        password
    })
    await user.save()
    res.send("Registeration Done..")
}

export const Find = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.send("Email Is Manditory")
    const user = await User.find({ email: email })
    console.log(user, "Users Here");
    if (user.length) {
        return res.send(user)
    }
    return res.send("No User Found")
}

export const Update = async (req, res) => {
    // console.log(req.body, "req.body")
    const { age, number } = req.body;
    const { id } = req.params;
    if (!id) return res.send("Id is required!!!");
    if (!age) return res.send("Age is reqired!!!");
    if (!number) return res.send("Number is required");

    const updateuser = await User.findByIdAndUpdate(id, { age, number }, { new: true });
    //  return res.send("Data Updated....")
    return res.json({ message: "Data Updated....", data: updateuser })
}

export const Delete = async (req, res) => {
    const { id } = req.query;
    if (!id) return res.send("Id is required!!!")

    const deleteuser = await User.findByIdAndDelete(id);
    return res.json({ message: "Data Deleted", data: deleteuser })
}

