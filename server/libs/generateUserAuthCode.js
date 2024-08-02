export default async function generateUserAuthCode(codeSize = 6) {
  let code = '';
  const randomNumber = Math.round(Math.random() * codeSize);

  for (let i = 0; i < codeSize; i++) {
    code += randomNumber;
  }

  return code;
}
