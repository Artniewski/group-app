// type MajorRequest = AuthResponse;

// interface MajorResponse {
//   idSluchacza: string;
//   major: string;
// }

// app.post("/major", async (req, res) => {
//   const { YII_CSRF_TOKEN, JSOSSESSID } = req.body as MajorRequest;

//   const idSluchacza = await getIdSluchacza(YII_CSRF_TOKEN, JSOSSESSID);
//   const major = await getMajor(YII_CSRF_TOKEN, JSOSSESSID);

//   const responseBody: MajorResponse = {
//     idSluchacza,
//     major,
//   };

//   res.status(200).json(responseBody);
// });
