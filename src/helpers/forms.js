const forms = {
    handleForm: ({ target: { value, name } }, form, setForm) =>{
        setForm({ ...form, [name]: value });
    },
    sendForm: async (e, api, setState, body, navigate, whereTo) => {
        e.preventDefault();
        try {
          const res = await api(body);
          setState(res);
          navigate(whereTo);
        } catch (err) {
          console.log(err);
        }
    },
    sendFormWithoutState: async (e, api, body, navigate, whereTo) => {
      e.preventDefault();
      try {
        await api(body);
        if(navigate) navigate(whereTo);
      } catch (err) {
        console.log(err);
      }
  },
}

export default forms;