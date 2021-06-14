module.exports = (req, res, next) => {
  const { firstName, lastName, email, password, newPassword, newPassword2, currentPassword } = req.body;

    function checkEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
  
    if (req.path === "/register") {
      if (![email, firstName, lastName, password].every(Boolean)) {
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      } else if (password.length < 6) {
        return res.status(401).json("password must be at least 7 carracters long");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      }
    } 

    else if (req.path === "/userPatch") {
      if (![firstName, lastName, email].every(Boolean)) {
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      }
    }

    else if (req.path === "/userPassword") {
      if (![newPassword, newPassword2, currentPassword].every(Boolean)) {
        return res.status(401).json("Please, provide informations");
      } else if (newPassword != newPassword2) {
        return res.status(401).json("New password do not match");
      }
    }
    
  
    next();
  };