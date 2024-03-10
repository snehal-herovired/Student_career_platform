const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


// User Registration Controller
async function registerUser(req, res) {
    const { email, password, username } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Registration failed', error });
    }
}

// User Login Controller
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found',login:false });
        }

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' ,login:false});
        }

        // Generate a JSON Web Token (JWT)
        //jsonwebtoken
        const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        });

        return res.status(200).json({ message: 'Login successful', token ,login:true ,admin:true});
    } catch (error) {
        return res.status(500).json({ message: 'Login failed', error,login:false });
    }
}



// Get User by ID
const userbyId =async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user', error });
  }
}

// Get User by Email
const userbyEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// Update User Details by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, username, password, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = email;
        user.username = username;
        user.password = password;
        user.role = role;

        await user.save();

        return res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating user details', error });
    }
};

// Delete User by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user', error });
    }
};




module.exports = {
    registerUser,loginUser,deleteUser,updateUser,userbyEmail,userbyId
}