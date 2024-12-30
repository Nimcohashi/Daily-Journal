const testController = (req, res) => {
  res.send("Hello World");
};

const greetMe = (req, res) => {
  const { name } = req.body;

  res.send("Hello " + name);
};

// export the controller
module.exports = { testController, greetMe };
