const Club = require("../models/clubs");
// create club
exports.CreateClub= async (req, res) => {
  try {
    const club = new Club({
      name: req.body.name,
      description: req.body.description,
      admin: req.user.id
    });
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 

// Fetch all clubs

exports.FetchAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate('admin', 'name') // Populate only 'name' of the admin
      .populate('members', 'name'); // Populate 'name' of members

    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Fetch  a specific club id

exports.GetById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).populate('admin') .populate("members", "name email") // Populates members with 'name' and 'email' fields
    .exec();
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} ;

// Join a club 

exports.JoinClub =  async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    if (!club.members.includes(req.user.id)) {
      club.members.push(req.user.id);
      await club.save();
    }
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.LeaveClub =  async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    club.members = club.members.filter(member => member.toString() !== req.user.id.toString());
    await club.save();
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  delete the club (Admin only);
// exports.DeleteClub = async (req, res) => {
//   try {
//     const club = await Club.findById(req.params.id);
//     if (!club) return res.status(404).json({ message: 'Club not found' });

//     if (club.admin.toString() !== req.user.id.toString()) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     await club.remove();
//     res.json({ message: 'Club deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.DeleteClub = async (req, res) => {
  try {
    // Ensure that the user is authenticated (check token)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized. No user found.' });
    }

    console.log('Request User ID:', req.user.id);  // Log user ID for debugging
    console.log('Request Club ID:', req.params.id);  // Log the club ID for debugging

    // Find the club by ID from the database
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check if the user is the admin of the club
    if (club.admin.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized. You are not the admin.' });
    }

    // Use deleteOne() instead of remove() for better compatibility
    const result = await Club.deleteOne({ _id: req.params.id });

    // Check if any document was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Club not found or already deleted' });
    }

    // Send response back to the client
    res.json({ message: 'Club deleted successfully' });
  } catch (err) {
    // Log the error for debugging purposes
    console.error('Error while deleting club:', err);

    // Check for specific error types (optional, based on your logic)
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid club ID format.' });
    }

    // General error handling
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};




exports.fetchAllMembers =  async (req, res) => {
  const { id } = req.params;



  try {
    const club = await Club.findById(id);

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club.members); // Send the list of members
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// edit the club 

exports.EditClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    // Check if club exists
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Update club details
    club.name = req.body.name || club.name;
    club.description = req.body.description || club.description;

    await club.save();
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

