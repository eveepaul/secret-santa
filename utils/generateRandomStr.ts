import cryptoRandomString from 'crypto-random-string';

export const generateRandomStr = (length: number) => {

  const poolID = cryptoRandomString({ length, type: 'distinguishable' });
  // check db if poolID exists
  return poolID;
};

