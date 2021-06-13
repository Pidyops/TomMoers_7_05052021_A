module.exports = (req, res, next) => {
  console.log('----- check Info ----- ')  
  const { firstName, lastName, email, password, newPassword, newPassword2, currentPassword } = req.body;
    console.log(firstName, lastName, email, password)
    console.log('req.path', req.path)

  
    function checkEmail() {
      console.log('invalid email')
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
  
    if (req.path === "/register") {
      if (![email, firstName, lastName, password].every(Boolean)) {
        console.log('register: provide info')
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      } else if (password.length < 6) {
        console.log('register: password lenght')
        return res.status(401).json("password must be at least 7 carracters long");
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        console.log('login: provide info')
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      }
    } 
    
    //userId required

    else if (req.path === "/userPatch") {
      if (![firstName, lastName, email].every(Boolean)) {
        console.log('login: provide info')
        return res.status(401).json("Please, provide informations");
      } else if (!checkEmail(email)) {
        return res.status(401).json("Please, provide a valid email");
      }
    }

    else if (req.path === "/userPassword") {
      if (![newPassword, newPassword2, currentPassword].every(Boolean)) {
        console.log('login: provide info')
        return res.status(401).json("Please, provide informations");
      } else if (newPassword != newPassword2) {
        return res.status(401).json("New password do not match");
      }
    }
    
  
    next();
  };