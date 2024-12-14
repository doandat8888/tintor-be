const axios = require('axios');

module.exports = {
  getMatchingResults: async(req, res) => {
    const {
      skills,
      experience,
      department,
      learningGoal,
      availability,
      interest,
      phoneNumber,
      email
    } = req.body;
    try {
      // Call Matching Service API with provided parameters
      const response = await axios.post(`${process.env.TINTOR_MATCHING_URL}/predict`, {
        skills,
        experience,
        department,
        learningGoal,
        availability,
        interest,
        phoneNumber,
        email
      });
      if(response.data) {
        return res.status(200).json({
          message: "Matching results fetched successfully",
          data: response.data
        });
      }
    } catch (error) {
      console.error('Error fetching matching results:', error.message);
      return res.status(500).json({
        message: "An error occurred while fetching matching results",
        error: error.message
      });
    }
  }
}