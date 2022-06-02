const credentialList = {
  loginUserArray: [
    {
      userName: "sm-project",
      mailid: "sfm.20031998@gmail.com",
      password: "User0@smp",
      name: "Suneel F M",
      img: { src: "/Images/user.JPG" },
    },
  ],
  loggedInUser: {},
  personalDetails: {
    isLoding: false,
    details: {},
    errMsg: null,
  },
  isDarkMode: false,
};

export const signInReducer = (state = credentialList, action) => {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        loggedInUser: action.userDetails,
      };

    case "UpdateProfile":
      const users = [...state.loginUserArray];
      users.splice(state.loginUserArray.indexOf(state.loggedInUser), 1);
      users.push(action.userdetails);

      return {
        ...state,
        loginUserArray: users,
        loggedInUser: action.userdetails,
      };

    case "signUp":
      return {
        ...state,
        loginUserArray: [...state.loginUserArray, action.credentials],
      };

    case "forgotPsw": {
      let matched = state.loginUserArray.filter(
        (item) => action.credentials.mailid === item.mailid
      );
      state.loginUserArray.splice(state.loginUserArray.indexOf(matched[0]), 1);
      matched[0].password = action.credentials.password;
      return {
        ...state,
        loginUserArray: [...state.loginUserArray, matched[0]],
      };
    }

    case "darkMode": {
      return {
        ...state,
        isDarkMode: action.mode,
      };
    }

    case "ChagePassword": {
      const currpsw = { ...state.loggedInUser };

      state.loginUserArray.splice(state.loginUserArray.indexOf(currpsw), 1);
      currpsw.password = action.password;
      return {
        ...state,
        loggedInUser: currpsw,
        loginUserArray: [...state.loginUserArray, currpsw],
      };
    }

    case "PersonalRecords":
      return {
        ...state,
        personalDetails: {
          ...state.personalDetails,
          isLoding: false,
          details: action.detail,
        },
      };

    default:
      return state;
  }
};
