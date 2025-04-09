const handleOwnerSignUp = (e) => {
    e.preventDefault();
    console.log("inside Owner Sign Up ");
    console.log(signUpFormData.password);
      const {data, error} = supabase.auth.signUp({
        email: signUpFormData.email,
        password: signUpFormData.password,
        options: {
          data: {
            first_name: "",
            last_name: "",
            account_type: "O",
          }
        }
      })
  
      if (error) {
        console.log(error)
      }
      if(data){
        console.log(data)
      }
    }

export default handleOwnerSignUp;