export const validateEmail = (email: string) => {
  return email.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const convertToBase64 = (file: File) => {
  return new Promise<{ result?: string; error: any }>(
    function (resolve: any, reject: any) {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        resolve({
          result: e.target?.result as string | undefined,
          error: e.target?.error,
        });
      };
      reader.readAsDataURL(file);
    }.bind(this)
  );
};
