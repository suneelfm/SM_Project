const credentialList = {
  loginUserArray: [
    {
      userName: "s",
      mailid: "sfm.20031998@gmail.com",
      password: "123",
      name: "Suneel F M",
      img:"/Images/user.png"
    },
  ],
  personalDetails: {
    isLoding: false,
    details: {},
    errMsg: null,
  },
};

export const signInReducer = (state = credentialList, action) => {
  switch (action.type) {
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
